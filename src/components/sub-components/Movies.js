import { useEffect, useState } from "react";
import TitleCard from "./Title-Card";
import Modal from "./Modal";
import BasicPagination from "./Mui-Pagination";
import Clickable from "./ClickableGenre";

const Movies = () => {
  const [genres, setGenres] = useState(null);
  const [genresChecked, setGenresChecked] = useState([]);

  const [movies, setMovies] = useState(null);
  const [isMoviesFetched, setIsMoviesFetched] = useState(false);

  /* modal related */
  const [showDetailsModal, setIsShowDetailsModal] = useState(false);
  const [overview, setOverview] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalReleaseDate, setModalReleaseDate] = useState(null);
  const [modalId, setModalId] = useState(null);

  /* pagination related */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies) {
      setTotalPageCount(movies.total_pages);
    }
  }, [movies]);

  useEffect(() => {
    /* Reset */
    setIsMoviesFetched(false);
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    /* fetch */
    fetchMovies();
  }, [genresChecked]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list",
        options
      );

      if (!response.ok) {
        throw Error("Can't fetch genres");
      }

      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.log(error);
    }
  };

  const linkHandler = () => {
    let link = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`;

    if (genresChecked.length === 1) {
      link = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${genresChecked[0].id}`;
    } else if (genresChecked.length > 1) {
      link = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${genresChecked[0].id}`;
      for (let i = 0; i < genresChecked.length; i++) {
        link = link + `%2C${genresChecked[i].id}`;
      }
    }
    return link;
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(linkHandler(), options);

      if (!response.ok) {
        throw Error("Can't fetch movies");
      }

      const data = await response.json();

      setMovies(data);
      setIsMoviesFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const showGenres = () => {
    return genres.genres.map((each) => {
      return (
        <Clickable
          key={each.id}
          genre={each}
          genresChecked={genresChecked}
          setGenresChecked={setGenresChecked}
        />
      );
    });
  };

  const showModal = (e) => {
    setIsShowDetailsModal(!showDetailsModal);
    setOverview(e.overview);
    setModalImage(e.backdrop_path);
    setModalTitle(e.title);
    setModalReleaseDate(e.release_date);
    setModalId(e.id);
    console.log(e);
  };

  return (
    <div className="movies-container">
      <div className="genres">{genres && showGenres()}</div>
      <div className="movies">
        {isMoviesFetched && (
          <TitleCard data={movies} showModal={showModal} isMovie={true} />
        )}
      </div>

      <div>
        {totalPageCount && (
          <BasicPagination
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
          />
        )}
      </div>

      {showDetailsModal && (
        <Modal
          showDetailsModal={showDetailsModal}
          setIsShowDetailsModal={setIsShowDetailsModal}
          overview={overview}
          imageSource={modalImage}
          title={modalTitle}
          releaseDate={modalReleaseDate}
          id={modalId}
        />
      )}
    </div>
  );
};

export default Movies;
