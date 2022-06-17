import { useEffect } from "react";

export default function Home() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const getTopOneMovieImage = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const dataListing = await response.json();
    const topOneMovie = dataListing.results[0];
    console.log(topOneMovie);
  };

  useEffect(() => {
    getTopOneMovieImage();
  }, []);

  return <main></main>;
}
