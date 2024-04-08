import { useEffect } from "react";
import { useState } from "react";
import TitleCard from "./Title-Card";
import BasicPagination from "./Mui-Pagination";
import Modal from "./Modal";
import { FadeLoader } from "react-spinners";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { useRef } from "react";

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
  const [totalPageCount, setTotalPageCount] = useState("");

  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  /* loading */
  const [isLoading, setIsLoading] = useState(false);

  /* if there are no results */
  const [hasResults, setHasResults] = useState(true);
  useEffect(() => {
    if (isMovieSelected === true) {
      fetchMovieByQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMovieSelected]);

  useEffect(() => {
    if (isTvSelected) {
      fetchTV_SeriesByQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTvSelected]);

  useEffect(() => {
    if (isMovieSelected) {
      fetchMovieByQuery();
    } else if (isTvSelected) {
      fetchTV_SeriesByQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageForMovie, pageforTV, isSearchButtonClicked]);

  const windowSize = useRef([window.innerHeight, window.innerWidth]);

  const handleMovieClick = () => {
    setIsMovieSelected(true);
    setIsTvSelected(false);
    setIsLoading(true);
  };

  const handleTv_SeriesClick = () => {
    setIsTvSelected(true);
    setIsMovieSelected(false);
    setIsLoading(true);
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
    setHasResults(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${request}&include_adult=false&language=en-US&page=${pageForMovie}`,
        options
      );
      if (!response.ok) {
        throw Error("cant fetch movie query");
      }

      const data = await response.json();

      if (data.total_results === 0) {
        console.log("data is empty");
        setHasResults(false);
      }

      setMoviesData(data);
      setIsSearchButtonClicked(false);

      setTotalPageCount(data.total_pages);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTV_SeriesByQuery = async () => {
    setIsLoading(true);
    setHasResults(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${request}&include_adult=false&language=en-US&page=${pageforTV}`,
        options
      );
      if (!response.ok) {
        throw Error("cant fetch tv-series query");
      }

      const data = await response.json();

      if (data.total_results === 0) {
        console.log("data is empty");
        setHasResults(false);
      }

      setTvSeriesData(data);
      setIsSearchButtonClicked(false);

      setTotalPageCount(data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Directions = () => {
    return (
      <div className="directions-container">
        <div className="direction-icon-container">
          <InfoOutlinedIcon
            sx={{
              fontSize: windowSize > 768 ? "4rem" : "2.5rem",
              color: "lightseagreen",
            }}
          />
        </div>

        <div className="search-directions">
          *Write the title/name then Choose media type to begin the search
        </div>
      </div>
    );
  };

  const showModal = (e) => {
    /* console.log(e); */
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

  const showMovies = () => {
    /* console.log(moviesData); */
    if (isLoading) {
      return (
        <div className="loading">
          <FadeLoader color="#20b2aa" />
        </div>
      );
    } else if (!isLoading && isMovieSelected && moviesData) {
      return (
        <div>
          <div className="movies">
            <TitleCard data={moviesData} showModal={showModal} isMovie={true} />
          </div>

          <BasicPagination
            setCurrentPage={setPageForMovie}
            totalPageCount={totalPageCount}
            page={pageForMovie}
          />
        </div>
      );
    }
  };

  const showTvSeries = () => {
    /* console.log(tvSeriesData); */
    if (isLoading) {
      return (
        <div className="loading">
          <FadeLoader color="#20b2aa" />
        </div>
      );
    } else if (!isLoading && isTvSelected && tvSeriesData) {
      return (
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
      );
    }
  };

  const showResults = () => {
    if (isMovieSelected) {
      return showMovies();
    } else if (isTvSelected) {
      return showTvSeries();
    }
  };

  const NoResult = () => {
    return (
      <div className="no-result-container">
        <div className="no-result-icon">
          <SentimentDissatisfiedOutlinedIcon
            sx={{ color: "lightseagreen", fontSize: "5rem" }}
          />
        </div>
        <div className="no-result-text">Sorry, we could't find any results</div>
      </div>
    );
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
        {!isMovieSelected && !isTvSelected && <Directions />}
        {hasResults ? showResults() : <NoResult />}

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
