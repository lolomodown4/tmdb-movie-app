import { useEffect, useState } from "react";
import Carousel from "./Carousel";

const Modal = ({
  imageSource,
  showDetailsModal,
  setIsShowDetailsModal,
  overview,
  title,
  releaseDate,
  id,

  /* added new */
  media_type,
}) => {
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (id) {
      fetchKey();
    }
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDg5Y2E3MTg4Y2Q1OGE4NTY0ZjUwYTkxMzZiYjAzNCIsInN1YiI6IjY1ZmFiZGFmYTE5OWE2MDE0OWRkOGIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Ix84m0kUWl-_ta_knVAUt-NRhP100-Giucj8IyO-5A",
    },
  };

  /* we need the key that will be used as a parameter in th YT link */
  const fetchKey = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`,
        options
      );

      if (!response.ok) {
        throw new Error("can't fetch the key");
      }

      const data = await response.json();
      setKey(data.results[0].key);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => setIsShowDetailsModal(!showDetailsModal)}
        >
          &times;
        </span>
        <div className="modal-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${imageSource}`}
            alt="no backdrop link available"
          />
        </div>
        <div className="modal-title">
          {title} {releaseDate?.substring(0, 4)}
        </div>
        <p className="modal-overview">{overview ? overview : "Some text"}</p>
        <div className="carousell">
          <p>Casts</p>
          <Carousel id={id} media_type={media_type} />
        </div>

        {key && (
          <a
            href={`https://www.youtube.com/watch?v=${key}`}
            target="_blank"
            className="trailer-button"
          >
            Watch trailer
          </a>
        )}
      </div>
    </div>
  );
};

export default Modal;
