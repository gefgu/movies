import { useEffect, useState } from "react";

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
      <div
        className="hero w-full h-screen"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>
    </main>
  );
}
