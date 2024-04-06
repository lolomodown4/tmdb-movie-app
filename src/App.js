import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { useRef } from "react";

function App() {
  const windowSize = useRef(window.innerWidth);

  return (
    <div className="App">
      <Header />
      <MainContent />

      {windowSize.current > 1024 && <Footer />}
    </div>
  );
}

export default App;
