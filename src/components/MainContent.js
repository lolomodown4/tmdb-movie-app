import { Route, Routes } from "react-router-dom";
import Trending from "./sub-components/Trending";
import Movies from "./sub-components/Movies";
import TvSeries from "./sub-components/Tv-series";
import Search from "./sub-components/Search";

const MainContent = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default MainContent;
