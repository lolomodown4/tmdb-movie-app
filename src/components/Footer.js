import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isTrendingClicked, setIsTrendingClicked] = useState(true);
  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isTvSeriesClicked, setIsTvSeriesClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleTrendingClicked = () => {
    /* this is the one that is clicked */
    setIsTrendingClicked(true);

    /* false other options so that css wont apply */
    setIsMoviesClicked(false);
    setIsTvSeriesClicked(false);
    setIsSearchClicked(false);
  };

  const handleMoviesClicked = () => {
    /* this is the one that is clicked */
    setIsMoviesClicked(true);

    /* false other options so that css wont apply */
    setIsTrendingClicked(false);
    setIsTvSeriesClicked(false);
    setIsSearchClicked(false);
  };

  const handleTv_seriesClicked = () => {
    /* this is the one that is clicked */

    setIsTvSeriesClicked(true);

    /* false other options so that css wont apply */
    setIsTrendingClicked(false);
    setIsMoviesClicked(false);
    setIsSearchClicked(false);
  };

  const handleSearchClicked = () => {
    /* this is the one that is clicked */
    setIsSearchClicked(true);

    /* false other options so that css wont apply */
    setIsTrendingClicked(false);
    setIsMoviesClicked(false);
    setIsTvSeriesClicked(false);
  };

  return (
    <div className="footer">
      <nav>
        <ul className="navigation-links">
          <li>
            <Link
              to="/"
              className={isTrendingClicked ? "selected-link" : "links"}
              onClick={handleTrendingClicked}
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={isMoviesClicked ? "selected-link" : "links"}
              onClick={handleMoviesClicked}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/tv-series"
              className={isTvSeriesClicked ? "selected-link" : "links"}
              onClick={handleTv_seriesClicked}
            >
              TV Series
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={isSearchClicked ? "selected-link" : "links"}
              onClick={handleSearchClicked}
            >
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
