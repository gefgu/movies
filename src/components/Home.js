import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import PostersListing from "./PostersListing";

export default function Home() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);

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

  const getMovieBackdrop = (movie) => {
    const imagePath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    return imagePath;
  };

  const getMoviePoster = (movie) => {
    return `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  };

  const getMoviesPosters = (movies) => {
    const postersArray = movies.map((movie) => {
      return getMoviePoster(movie);
    });

    return postersArray;
  };

  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
  }, []);

  return (
    <main>
      <HeroSection
        heroImage={popularMovies && getMovieBackdrop(popularMovies[0])}
      />
      <div className="bg-stone-900 p-8">
        <section>
          <h3 className="text-white text-xl">Popular Movies</h3>
          <hr className="my-2" />
          {popularMovies && (
            <PostersListing
              posters={getMoviesPosters(popularMovies).slice(
                0,
                moviesInDisplay
              )}
            />
          )}
        </section>
        <section>
          <h3 className="text-white text-xl">Top Rated Movies</h3>
          <hr className="my-2" />
          {topRatedMovies && (
            <PostersListing
              posters={getMoviesPosters(topRatedMovies).slice(
                0,
                moviesInDisplay
              )}
            />
          )}
        </section>
      </div>
    </main>
  );
}
