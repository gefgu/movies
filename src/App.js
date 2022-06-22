import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import NavBar from "./components/NavBar";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function App() {
  const app = initializeApp(firebaseConfig);
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);

  const signInUser = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    const auth = getAuth();
    console.log(auth);
    setCurrentUser(auth.currentUser);
  };

  const signOutUser = async () => {
    await signOut(getAuth());
    const auth = getAuth();
    setCurrentUser(auth.currentUser);
  };

  return (
    <BrowserRouter>
      <NavBar
        user={currentUser}
        signInUser={signInUser}
        signOutUser={signOutUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
