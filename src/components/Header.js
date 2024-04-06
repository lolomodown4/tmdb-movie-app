import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";

const Header = () => {
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const windowSize = useRef(window.innerWidth);

  const handleClick = () => {
    setIsBurgerClicked(true);
  };

  const handleTrending = () => {
    setIsBurgerClicked(false);
  };
  const handleMovies = () => {
    setIsBurgerClicked(false);
  };

  const handleTv_series = () => {
    setIsBurgerClicked(false);
  };

  const handleSearch = () => {
    setIsBurgerClicked(false);
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
                <Link to="/" onClick={handleTrending} className="links">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/movies" onClick={handleMovies} className="links">
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-series"
                  onClick={handleTv_series}
                  className="links"
                >
                  Tv-Series
                </Link>
              </li>
              <li>
                <Link to="/search" onClick={handleSearch} className="links">
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
