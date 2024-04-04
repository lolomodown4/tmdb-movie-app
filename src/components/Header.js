import logo from "../assets/TMDB_logo.png";
const Header = () => {
  return (
    <h1 className="header">
      <img src={logo} alt="logo"></img>
      <div> Find movie/TV Details here </div>
    </h1>
  );
};

export default Header;
