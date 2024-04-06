import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";

const Header = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const [isTrendingClicked, setIsTrendingClicked] = useState(true);
  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isTv_SeriesClicked, setIsTv_SeriesClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const windowSize = useRef(window.innerWidth);

  const handleClick = () => {
    setIsBurgerClicked(true);
  };

  const handleTrending = () => {
    setIsBurgerClicked(false);

    setIsTrendingClicked(true);

    /* false other states categories */
    setIsMoviesClicked(false);
    setIsTv_SeriesClicked(false);
    setIsSearchClicked(false);
  };
  const handleMovies = () => {
    setIsBurgerClicked(false);

    setIsMoviesClicked(true);

    /* false other states categories */
    setIsTrendingClicked(false);
    setIsTv_SeriesClicked(false);
    setIsSearchClicked(false);
  };

  const handleTv_series = () => {
    setIsBurgerClicked(false);

    setIsTv_SeriesClicked(true);

    /* false other states categories */
    setIsTrendingClicked(false);
    setIsMoviesClicked(false);
    setIsSearchClicked(false);
  };

  const handleSearch = () => {
    setIsBurgerClicked(false);

    setIsSearchClicked(true);

    /* false other states categories */
    setIsTrendingClicked(false);
    setIsMoviesClicked(false);
    setIsTv_SeriesClicked(false);
  };

  return (
    <h1 className="header">
      {windowSize.current < 992 && (
        <button className="burger-menu" onClick={handleClick}>
          <MenuOutlinedIcon />
        </button>
      )}
      <img src={logo} alt="logo"></img>
      <div> Find movie/TV Details here </div>

      {/* eto yung choices na palalabasin */}
      {isBurgerClicked && (
        <div className="burger-categories">
          <span
            onClick={() => setIsBurgerClicked(false)}
            className="burger-close"
          >
            &times;
          </span>

          <div className="burger-directions">Choose Category</div>

          <nav className="burger-nav">
            <ul className="burger-links">
              <li>
                <Link
                  to="/"
                  onClick={handleTrending}
                  className={isTrendingClicked ? "selected-link" : "links"}
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  onClick={handleMovies}
                  className={isMoviesClicked ? "selected-link" : "links"}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-series"
                  onClick={handleTv_series}
                  className={isTv_SeriesClicked ? "selected-link" : "links"}
                >
                  Tv-Series
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  onClick={handleSearch}
                  className={isSearchClicked ? "selected-link" : "links"}
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </h1>
  );
};

export default Header;
