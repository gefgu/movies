import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertMinutesIntoHoursAndMinutes, getTMDBImage } from "../helpers";
import Carousel from "./Carousel";
import MoviesList from "./MoviesList";
import ReviewPopup from "./ReviewPopup";

export default function MoviePage({ signInUser, user }) {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [movieImages, setMovieImages] = useState(null);
  const [movieCast, setMovieCast] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [displayReviewPopup, setDisplayReviewPopup] = useState(false);
  const [reviews, setReviews] = useState(null);

  const imagesInDisplay = 12;

  const getMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    setMovieDetails(data);
  };

  const getMovieVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    if (data.results.length > 0) setMovieVideos(data.results);
  };

  const getMovieImages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${MOVIE_API_KEY}`
    );
    const data = await response.json();
    setMovieImages(data);
  };

  const getMovieCast = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`
    );
    const data = await response.json();
    setMovieCast(data.cast);
  };

  const getSimilarMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    setSimilarMovies(data.results.slice(0, 6));
  };

  const getMovieTrailers = (movieVideos) => {
    return movieVideos.filter(
      (video) => video.type.toLowerCase() === "trailer"
    );
  };

  const getReviews = async () => {
    try {
      const reviewsQuery = query(collection(getFirestore(), "reviews"));

      const reviewsSnapshot = await getDocs(reviewsQuery);
      let newReviews = [];
      reviewsSnapshot.forEach((review) => {
        if (`${review.data().movie}` === `${movieId}`) {
          newReviews.push(review.data());
        }
      });
      setReviews(newReviews);
    } catch (error) {
      console.error("Error trying to ge reviews", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
    getMovieImages();
    getMovieCast();
    getSimilarMovies();
    getReviews();

    return () => {
      setMovieDetails(null);
      setMovieVideos(null);
      setMovieImages(null);
      setMovieCast(null);
      setSimilarMovies(null);
    };
  }, [movieId]);

  const addReview = async () => {
    console.log(user);
    if (!user) {
      await signInUser();
    }
    setDisplayReviewPopup(true);
  };

  const removeReviewPopup = () => {
    setDisplayReviewPopup(false);
    getReviews();
  };

  return (
    movieDetails && (
      <>
        <section className="p-4 bg-stone-800 text-white xl:px-64 2xl:px-96">
          <h2 className="text-3xl font-bold mt-8 mb-2">
            {movieDetails.original_title}
          </h2>
          <div className="flex gap-3 text-stone-200">
            <span>{movieDetails.release_date.split("-")[0]}</span>
            <span>•</span>
            <span>{`${
              convertMinutesIntoHoursAndMinutes(movieDetails.runtime).hours
            }h ${
              convertMinutesIntoHoursAndMinutes(movieDetails.runtime).minutes
            }m`}</span>
          </div>
          <div className="py-8 flex flex-wrap justify-center md:justify-between md:flex-nowrap gap-8">
            <img
              src={getTMDBImage(movieDetails.poster_path)}
              alt="Movie Poster"
              className="max-w-xs"
            />
            {movieVideos && (
              <iframe
                src={`https://www.youtube.com/embed/${
                  getMovieTrailers(movieVideos)[0].key
                }`}
                frameBorder="0"
                allowFullScreen
                title="video"
                className="w-full max-w-3xl min-h-[480px]"
              />
            )}
          </div>
          <div className="text-white flex flex-wrap gap-4">
            {movieDetails.genres.map((genre) => {
              return (
                <span
                  className="border-2 px-4 py-2 rounded-full"
                  key={genre.name}
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className="my-6 text-lg">
            <p>{movieDetails.overview}</p>
          </div>
        </section>
        {movieVideos && (
          <section className="my-16 mx-4 xl:mx-64 2xl:mx-96 relative">
            <h3 className="text-3xl border-l-4 p-2 border-yellow-400">
              Videos
            </h3>
            <Carousel
              imagesInDisplay={7}
              listing={movieVideos.slice(0, 7).map((video) => (
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen
                  title="video"
                  className="flex-shrink-0"
                  height="400"
                  width="576"
                  key={video.key}
                />
              ))}
            />
          </section>
        )}
        {movieImages && (
          <section className="my-16 mx-4 xl:mx-64 2xl:mx-96 relative">
            <h3 className="text-3xl border-l-4  p-2 border-yellow-400">
              Photos
            </h3>
            <Carousel
              imagesInDisplay={imagesInDisplay}
              listing={movieImages.backdrops
                .slice(0, imagesInDisplay)
                .map((image) => (
                  <img
                    src={getTMDBImage(image.file_path)}
                    alt="Movie"
                    className="h-96 object-cover"
                    key={image.file_path}
                  />
                ))}
            />
          </section>
        )}
        {movieCast && (
          <section className="my-16 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4  p-2 border-yellow-400">
              Top Cast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 w-full justify-between">
              {movieCast.slice(0, 14).map((person) => {
                if (!person.profile_path) return "";
                return (
                  <section className="flex items-center">
                    <img
                      src={getTMDBImage(person.profile_path)}
                      alt="profile"
                      className="h-32 w-28 object-cover rounded-full"
                    />
                    <div className="flex flex-col mx-4">
                      <h4 className="text-2xl my-2 font-bold">{person.name}</h4>
                      <h5 className="text-gray-800">{person.character}</h5>
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        )}
        {similarMovies && (
          <section className="my-16 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4 p-2 border-yellow-400 my-8">
              More like this
            </h3>
            <MoviesList movies={similarMovies} />
          </section>
        )}
        {reviews && (
          <section className="my-16 mx-4 xl:px-64 2xl:px-96">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl border-l-4 p-2 border-yellow-400 my-8">
                User Reviews
              </h3>
              <button
                onClick={addReview}
                className="mx-2 text-xl hover:bg-stone-200 active:bg-stone-300 p-4 h-fit"
              >
                + Review
              </button>
            </div>
            {reviews.map((review) => {
              return (
                <section className="my-6 rounded-lg p-4 shadow-md border">
                  <h4 className="text-xl font-bold my-4">{review.title}</h4>
                  <div className="my-4">⭐ {review.rating}/10</div>
                  <p className="my-4 text-justify">{review.content}</p>
                  <p>
                    {review.author} • {review.date}
                  </p>
                </section>
              );
            })}
          </section>
        )}
        {displayReviewPopup && (
          <ReviewPopup
            movieDetails={movieDetails}
            removePopup={removeReviewPopup}
            user={user}
          />
        )}
      </>
    )
  );
}
