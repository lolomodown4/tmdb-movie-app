import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

import NewPagination from "./components/sub-components/New_Pagination";

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
      {/* <NewPagination /> */}
    </div>
  );
}

export default App;
