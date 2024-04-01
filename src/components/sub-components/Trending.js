import { useEffect, useState } from "react";
import Modal from "./Modal";
import BasicPagination from "./Mui-Pagination";
import TitleCard from "./Title-Card";

const Trending = () => {
  const [trendingData, setTrendingData] = useState(null);
  const [isData, setIsData] = useState(false);

  /* Modal related */
  const [showDetailsModal, setIsShowDetailsModal] = useState(false);
  const [overview, setOverview] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalReleaseDate, setModalReleaseDate] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [modalMediaType, setModalMediaType] = useState(null);

  /* pagination related */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (trendingData) {
      setTotalPageCount(trendingData.total_pages);
    }
  }, [trendingData]);

  /* delete after finishing the modal */
  /* useEffect(() => {
    console.log(trendingData);
  }, [showDetailsModal]); */

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${currentPage}`,
        options
      );

      if (!response.ok) {
        throw Error("unable to fetch trending data");
      }

      const data = await response.json();

      setTrendingData(data);
      setIsData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (e) => {
    setIsShowDetailsModal(!showDetailsModal);

    console.log(e);
    /* get the instance details clicked */
    setOverview(e.overview);
    setModalImage(e.backdrop_path);

    if (e.media_type === "movie") {
      setModalMediaType("movie");
      setModalTitle(e.title);
      setModalReleaseDate(e.release_date);
      setModalId(e.id);
    } else if (e.media_type === "tv") {
      setModalMediaType("tv");
      setModalTitle(e.name);
      setModalReleaseDate(e.first_air_date);
      setModalId(e.id);
    }
  };

  return (
    <div className="trending-container">
      <div>
        {showDetailsModal && (
          <Modal
            showDetailsModal={showDetailsModal}
            setIsShowDetailsModal={setIsShowDetailsModal}
            overview={overview}
            imageSource={modalImage}
            title={modalTitle}
            releaseDate={modalReleaseDate}
            id={modalId}
            media_type={modalMediaType}
          />
        )}
      </div>
      <div className="title-cards-container">
        {isData && (
          <TitleCard
            data={trendingData}
            showModal={showModal}
            isMovie={false}
          />
        )}
      </div>

      {totalPageCount && (
        <BasicPagination
          totalPageCount={totalPageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Trending;
