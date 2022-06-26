import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import PostersListing from "./PostersListing";
import {
  getMovieDetails,
  getPopularMovies,
  getTMDBImage,
  getTopRatedMovies,
} from "../helpers";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

export default function Home({ user, signInUser }) {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [moviesOfLatestReviews, setMoviesOfLatestReviews] = useState(null);

  const moviesInDisplay = 6;

  const getMoviesOfLatestReviews = async () => {
    try {
      const reviewsQuery = query(collection(getFirestore(), "reviews"));
      const reviewsSnapshot = await getDocs(reviewsQuery);
      let newReviews = [];
      reviewsSnapshot.forEach((review) => {
        const movieId = review.data().movie;
        newReviews.push(getMovieDetails(movieId, MOVIE_API_KEY));
      });
      const movies = await Promise.all(newReviews);
      console.log(movies);
      return movies;
    } catch (error) {
      console.error("Error trying to ge reviews", error);
    }
  };

  useEffect(() => {
    getPopularMovies(MOVIE_API_KEY).then((data) => setPopularMovies(data));
    getTopRatedMovies(MOVIE_API_KEY).then((data) => setTopRatedMovies(data));
    getMoviesOfLatestReviews().then((data) => setMoviesOfLatestReviews(data));

    return () => {
      setPopularMovies(null);
      setTopRatedMovies(null);
      setMoviesOfLatestReviews(null);
    };
  }, []);

  return (
    <main>
      <HeroSection
        heroImage={
          popularMovies && getTMDBImage(popularMovies[0].backdrop_path)
        }
        user={user}
        signInUser={signInUser}
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
        {moviesOfLatestReviews && (
          <PostersListing
            listingTitle="Last Reviewed Movies"
            movies={moviesOfLatestReviews.slice(0, moviesInDisplay)}
          />
        )}
      </div>
    </main>
  );
}
