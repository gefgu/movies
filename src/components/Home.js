import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import PostersListing from "./PostersListing";
import { getTMDBImage } from "../helpers";

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

  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
  }, []);

  return (
    <main>
      <HeroSection
        heroImage={
          popularMovies && getTMDBImage(popularMovies[0].backdrop_path)
        }
      />
      <div className="bg-stone-900 p-8 xl:px-64 2xl:px-96">
        {popularMovies && (
          <PostersListing
            listingTitle="Popular Movies"
            movies={popularMovies.slice(0, moviesInDisplay)}
          />
        )}
        {topRatedMovies && (
          <PostersListing
            listingTitle="Top Rated Movies"
            movies={topRatedMovies.slice(0, moviesInDisplay)}
          />
        )}
      </div>
    </main>
  );
}
