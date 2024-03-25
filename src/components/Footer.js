import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <nav>
        <ul className="navigation-links">
          <li>
            <Link to="/" className="links">
              Trending
            </Link>
          </li>
          <li>
            <Link to="/movies" className="links">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/tv-series" className="links">
              TV Series
            </Link>
          </li>
          <li>
            <Link to="/search" className="links">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
