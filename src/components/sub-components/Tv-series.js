import { useEffect, useState } from "react";
import Clickable from "./ClickableGenre";
import TitleCard from "./Title-Card";
import BasicPagination from "./Mui-Pagination";
import Modal from "./Modal";
import FadeLoader from "react-spinners/FadeLoader";

const TvSeries = () => {
  const [genresTV, setGenresTV] = useState(null);
  const [genresChecked, setGenresChecked] = useState([]);

  const [tv_series, setTv_series] = useState(null);

  /* modal related */
  const [showDetailsModal, setIsShowDetailsModal] = useState(false);
  const [overview, setOverview] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalReleaseDate, setModalReleaseDate] = useState(null);
  const [modalId, setModalId] = useState(null);

  /* pagination related */
  const [currentPage, setCurrentPage] = useState(1);

  /* loading state variable */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGenresForTV();
    fetchTV_series();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* burahin mamaya */
  useEffect(() => {
    console.log(genresTV);
    console.log(tv_series);
  }, [genresTV, tv_series]);
  /* burahin mamaya */

  useEffect(() => {
    fetchTV_series();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genresChecked, currentPage]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  const fetchGenresForTV = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list",
        options
      );

      if (!response.ok) {
        throw Error("Can't fetch tv-genres");
      }

      const data = await response.json();
      setGenresTV(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTV_series = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(linkHandler(), options);
      if (!response.ok) {
        throw Error("Cannot fetch TV-series");
      }

      const data = await response.json();
      setTv_series(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showTV_Genres = () => {
    return genresTV.genres.map((genre) => {
      return (
        <Clickable
          key={genre.id}
          genre={genre}
          genresChecked={genresChecked}
          setGenresChecked={setGenresChecked}
        />
      );
    });
  };

  const linkHandler = () => {
    let link = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`;

    if (genresChecked.length === 1) {
      link = link + `&with_genres=${genresChecked[0].id}`;
    } else if (genresChecked.length > 1) {
      link = link + `&with_genres=${genresChecked[0].id}`;

      for (let i = 0; i < genresChecked.length; i++) {
        link = link + `%2C${genresChecked[i].id}`;
      }
    }

    return link;
  };

  const showModal = (e) => {
    setIsShowDetailsModal(!showDetailsModal);
    setOverview(e.overview);
    setModalImage(e.backdrop_path);
    setModalTitle(e.name);
    setModalReleaseDate(e.first_air_date);
    setModalId(e.id);
  };

  return (
    <div className="tv-series-container">
      <div className="genres">{genresTV && showTV_Genres()}</div>
      {isLoading ? (
        <div className="loading">
          <FadeLoader color="#20b2aa" />
        </div>
      ) : (
        <div className="tv-series">
          {tv_series && <TitleCard data={tv_series} showModal={showModal} />}
        </div>
      )}

      <div>
        {tv_series && (
          <BasicPagination
            setCurrentPage={setCurrentPage}
            totalPageCount={tv_series.total_pages}
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
          media_type={"tv"}
        />
      )}
    </div>
  );
};

export default TvSeries;
