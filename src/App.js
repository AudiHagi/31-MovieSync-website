import "./App.css";
import MovieContentCard from "./components/MovieContentCard/MovieContentCard";
import TvContentCard from "./components/TvContentCard/TvContentCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="NavigationBar">
        <Navigation />
      </div>
      <Container className="Content">
        <Routes>
          <Route path="/" element={<MovieContentCard />} />
          <Route path="/movie" element={<MovieContentCard />} />
          <Route path="/tv" element={<TvContentCard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
