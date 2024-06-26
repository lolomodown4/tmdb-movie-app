import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FadeLoader } from "react-spinners";
import { useRef } from "react";

const Carousel = ({ id, media_type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [creditsData, setCreditsData] = useState(null);

  /* loading */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCreditsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(creditsData);
  }, [creditsData]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDg5Y2E3MTg4Y2Q1OGE4NTY0ZjUwYTkxMzZiYjAzNCIsInN1YiI6IjY1ZmFiZGFmYTE5OWE2MDE0OWRkOGIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Ix84m0kUWl-_ta_knVAUt-NRhP100-Giucj8IyO-5A",
    },
  };

  const fetchCreditsData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits`,
        options
      );

      if (!response.ok) {
        throw new Error("There is a problem fetching credits data");
      }

      const data = await response.json();

      setCreditsData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const windowSize = useRef(window.innerWidth);
  const castPerPage = windowSize.current > 768 ? 5 : 2;

  const prevCasts = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 4) {
        return 0;
      } else {
        return prevIndex - castPerPage;
      }
    });
  };

  const nextCasts = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + castPerPage >= creditsData.cast.length) {
        return 0;
      } else {
        return prevIndex + castPerPage;
      }
    });
  };

  return (
    <div className="carousell-holder">
      <button className="left-button" onClick={prevCasts}>
        <KeyboardArrowLeftIcon sx={{ color: "#EEEEEE" }} />
      </button>

      <div className="carousell-image">
        {isLoading ? (
          <div className="loading">
            <FadeLoader color="#20b2aa" width={2} height={8} />
          </div>
        ) : (
          creditsData?.cast
            .slice(currentIndex, currentIndex + castPerPage)
            .map((each) => (
              <div key={each.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${each.profile_path}`}
                  alt={each.name}
                />
                <p className="carousell-name">{each.name}</p>
              </div>
            ))
        )}
      </div>

      <button className="right-button" onClick={nextCasts}>
        <KeyboardArrowRightIcon sx={{ color: "#EEEEEE" }} />
      </button>
    </div>
  );
};

export default Carousel;
