import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";

export default function Home() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [heroImage, setHeroImage] = useState(null);

  const getTopOneMovieImage = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const dataListing = await response.json();
    const topOneMovie = dataListing.results[0];
    const imagePath = `https://image.tmdb.org/t/p/original/${topOneMovie.backdrop_path}`;
    setHeroImage(imagePath);
  };

  useEffect(() => {
    getTopOneMovieImage();
  }, []);

  return (
    <main>
      <HeroSection heroImage={heroImage}/>
      <div className="h-screen bg-stone-900 p-8">
        <section>
          <h3 className="text-white">Popular Movies</h3>
          <hr></hr>
        </section>
      </div>
    </main>
  );
}
