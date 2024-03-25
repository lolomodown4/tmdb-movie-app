import { useEffect, useState } from "react";
import Clickable from "./ClickableGenre";
import TitleCard from "./Title-Card";
import BasicPagination from "./Mui-Pagination";
import Modal from "./Modal";

const TvSeries = () => {
  const [genresTV, setGenresTV] = useState(null);
  const [genresChecked, setGenresChecked] = useState([]);

  const [tv_series, setTv_series] = useState(null);

  /* modal related */
  const [showDetailsModal, setIsShowDetailsModal] = useState(false);
  const [overview, setOverview] = useState(null);

  /* pagination related */
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchGenresForTV();
    fetchTV_series();
  }, []);

  /* burahin mamaya */
  useEffect(() => {
    console.log(genresTV);
    console.log(tv_series);
  }, [genresTV, tv_series]);
  /* burahin mamaya */

  useEffect(() => {
    fetchTV_series();
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
    try {
      const response = await fetch(linkHandler(), options);
      if (!response.ok) {
        throw Error("Cannot fetch TV-series");
      }

      const data = await response.json();
      setTv_series(data);
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
  };

  return (
    <div className="tv-series-container">
      <div className="genres">{genresTV && showTV_Genres()}</div>
      <div className="tv-series">
        {tv_series && <TitleCard data={tv_series} showModal={showModal} />}
      </div>

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
        />
      )}
    </div>
  );
};

export default TvSeries;
