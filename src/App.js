import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
