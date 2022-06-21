import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import NavBar from "./components/NavBar";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function App() {
  const app = initializeApp(firebaseConfig);
  const [authState, setAuthState] = useState(getAuth());

  return (
    <BrowserRouter>
      <NavBar setAuthState={setAuthState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
