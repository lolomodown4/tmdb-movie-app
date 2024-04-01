import { useEffect } from "react";
import { useState } from "react";
import TitleCard from "./Title-Card";
import BasicPagination from "./Mui-Pagination";
import Modal from "./Modal";

const Search = () => {
  const [input, setInput] = useState("");
  const [request, setRequest] = useState("");

  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const [isTvSelected, setIsTvSelected] = useState(false);

  const [moviesData, setMoviesData] = useState({});
  const [tvSeriesData, setTvSeriesData] = useState({});

  /* modal related */
  const [showDetailsModal, setIsShowDetailsModal] = useState(false);
  const [overview, setOverview] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalReleaseDate, setModalReleaseDate] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [modalMediaType, setModalMediaType] = useState(null);

  /* pagination related */
  const [pageForMovie, setPageForMovie] = useState(1);
  const [pageforTV, setPageForTV] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);

  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  useEffect(() => {
    fetchMovieByQuery();
    fetchTV_SeriesByQuery();
  }, []);

  useEffect(() => {
    if (moviesData && isMovieSelected) {
      fetchMovieByQuery();
      setTotalPageCount(moviesData.total_pages);
    }
  }, [moviesData, isMovieSelected]);

  useEffect(() => {
    if (tvSeriesData && isTvSelected) {
      fetchTV_SeriesByQuery();
      setTotalPageCount(tvSeriesData.total_pages);
    }
  }, [tvSeriesData, isTvSelected]);

  useEffect(() => {
    if (isMovieSelected) {
      fetchMovieByQuery();
    } else {
      fetchTV_SeriesByQuery();
    }
  }, [pageForMovie, pageforTV, isSearchButtonClicked]);

  const handleMovieClick = () => {
    setIsMovieSelected(true);
    setIsTvSelected(false);
  };

  const handleTv_SeriesClick = () => {
    setIsTvSelected(true);
    setIsMovieSelected(false);
  };

  const handleClick = () => {
    setRequest(input);
    setIsSearchButtonClicked(true);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDg5Y2E3MTg4Y2Q1OGE4NTY0ZjUwYTkxMzZiYjAzNCIsInN1YiI6IjY1ZmFiZGFmYTE5OWE2MDE0OWRkOGIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Ix84m0kUWl-_ta_knVAUt-NRhP100-Giucj8IyO-5A",
    },
  };

  const fetchMovieByQuery = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${request}&include_adult=false&language=en-US&page=${pageForMovie}`,
        options
      );
      if (!response.ok) {
        throw Error("cant fetch movie query");
      }

      const data = await response.json();

      setMoviesData(data);
      setIsSearchButtonClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTV_SeriesByQuery = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${request}&include_adult=false&language=en-US&page=${pageforTV}`,
        options
      );
      if (!response.ok) {
        throw Error("cant fetch tv-series query");
      }

      const data = await response.json();

      setTvSeriesData(data);
      setIsSearchButtonClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (e) => {
    console.log(e);
    setIsShowDetailsModal(!showDetailsModal);
    setOverview(e.overview);
    setModalId(e.id);
    setModalImage(e.backdrop_path);
    if (isMovieSelected) {
      setModalMediaType("movie");
      setModalTitle(e.title);
      setModalReleaseDate(e.release_date);
    } else if (isTvSelected) {
      setModalMediaType("tv");
      setModalTitle(e.name);
      setModalReleaseDate(e.first_air_date);
    }
  };

  return (
    <div className="search-container">
      <div className="input-bar">
        <input
          className="input"
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="search-button" onClick={handleClick}>
          search
        </button>
      </div>
      <div className="movieOrTv">
        <button
          className={
            isMovieSelected ? "choice-button-clicked" : "choice-button"
          }
          onClick={handleMovieClick}
        >
          Movie
        </button>
        <span className="or">||</span>
        <button
          className={isTvSelected ? "choice-button-clicked" : "choice-button"}
          onClick={handleTv_SeriesClick}
        >
          TV-series
        </button>
      </div>
      <div className="search-contents">
        {moviesData && isMovieSelected && (
          <div>
            <div className="movies">
              <TitleCard
                data={moviesData}
                showModal={showModal}
                isMovie={true}
              />
            </div>

            <BasicPagination
              setCurrentPage={setPageForMovie}
              totalPageCount={totalPageCount}
              page={pageForMovie}
            />
          </div>
        )}
        {isTvSelected && tvSeriesData && (
          <div>
            <div className="tv-series">
              <TitleCard
                data={tvSeriesData}
                showModal={showModal}
                isMovie={false}
              />
            </div>

            <BasicPagination
              setCurrentPage={setPageForTV}
              totalPageCount={totalPageCount}
              page={pageforTV}
            />
          </div>
        )}

        {showDetailsModal && (
          <Modal
            showDetailsModal={showDetailsModal}
            setIsShowDetailsModal={setIsShowDetailsModal}
            overview={overview}
            media_type={modalMediaType}
            id={modalId}
            title={modalTitle}
            releaseDate={modalReleaseDate}
            imageSource={modalImage}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
