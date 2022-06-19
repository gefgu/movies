import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import PostersListing from "./PostersListing";

export default function Home() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [popularPosters, setPopularPosters] = useState(null);

  const moviesInDisplay = 6;

  const getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const dataListing = await response.json();
    setPopularMovies(dataListing.results);
  };

  const getTopRatedMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const dataListing = await response.json();
    setTopRatedMovies(dataListing.results);
  };

  const getTopOneMovieImage = () => {
    if (popularMovies) {
      const topOneMovie = popularMovies[0];
      const imagePath = `https://image.tmdb.org/t/p/original/${topOneMovie.backdrop_path}`;
      setHeroImage(imagePath);
    }
  };

  const getMoviePoster = async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${MOVIE_API_KEY}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return `https://image.tmdb.org/t/p/original/${data.poster_path}`;
  };

  const getPopularMoviesPosters = async () => {
    let postersArray = [];

    for (const movie of popularMovies.slice(0, moviesInDisplay)) {
      const poster = await getMoviePoster(movie);
      postersArray.push(poster);
    }
    setPopularPosters(postersArray);
  };

  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    if (popularMovies) {
      getTopOneMovieImage();
      getPopularMoviesPosters();
    }
  }, [popularMovies]);

  return (
    <main>
      <HeroSection heroImage={heroImage} />
      <div className="bg-stone-900 p-8">
        <section>
          <h3 className="text-white text-xl">Popular Movies</h3>
          <hr className="my-2" />
          {popularPosters && <PostersListing posters={popularPosters} />}
        </section>
      </div>
    </main>
  );
}
