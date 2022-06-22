import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertMinutesIntoHoursAndMinutes, getTMDBImage } from "../helpers";
import MoviesList from "./MoviesList";
import ReviewPopup from "./ReviewPopup";

export default function MoviePage({ signInUser, user }) {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const { movieId } = useParams();
  // 338953 - Fantastic Beasts 3 id

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [movieImages, setMovieImages] = useState(null);
  const [movieCast, setMovieCast] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

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

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
    getMovieImages();
    getMovieCast();
    getSimilarMovies();

    // return () => {
    //   setMovieDetails(null);
    //   setMovieVideos(null);
    //   setMovieImages(null);
    //   setMovieCast(null);
    //   setSimilarMovies(null);
    // };
  }, [movieId]);

  const reviews = [
    {
      author: "User 1",
      stars: 7,
      date: "9 April 2022",
      title: "Much more of a Sonic movie this time",
      content: `The first Sonic movie was surprisingly competent. This one is even better, incorporating additional elements from the games and sticking to more of an action-adventure plot. It's a kid's movie through and through (way more toilet humor this go-around), but a fun one that never takes itself too seriously. Everyone in my theater was having a great time with it.

    As with the original, Jim Carrey steals the show as Eggman. This man is 60 years old and yet he has more verve than I do! He's so energetic he sometimes resembles a cartoon more than Sonic, Knuckles, or Tails! While I respect his desire to retire, I do hope he holds on and does the third movie-- there would be such a void without him there.`,
    },
    {
      author: "User 2",
      stars: 7,
      date: "6 April 2022",
      title: "Fun. What more do you want? ",
      content: `Following Dr Robotnik's exile, Sonic has settled down in rural Montana with adoptive parents Sheriff Tom and wife Maddie. What follows includes Robotnik's escape, the arrival of additional alien oddities Miles "Tails" Prower, the twin-tailed fox and Knuckles, the aggressive echidna, a marriage in Hawaii, a dance-off in Siberia, mushroom machinery, a Master Emerald, some annoying military intervention, and a giant robot.

      That sounds like a lot, but it's pretty straightforward stuff in a plot which aims directly at a 3-part audience - kids, tolerant parents, and mature gamers with fond memories of the original games. And I think it succeeds. It's brash, colourful, fast, eventful, funny, likeable, and has some pretty good visuals.`,
    },
    {
      author: "User 3",
      stars: 7,
      date: "7 April 2022",
      title:
        "Saw the 4DX early showing which was more intense than expected and so much fun!",
      content: `I never knew there was mist in the 4DK experience that was added excitement to a wildly entertaining movie! Sonic 2 is better, bigger budgeted and way more action than part 1. This is an ultimate adventure story of friendship, goofiness, and the bad guys take it up a notch. I loved this sequel quite a bit, I like how the audience clapped at the end bit.`,
    },
  ];

  const addReview = () => {
    console.log(user);
    if (!user) {
      signInUser();
      return;
    }
    console.log(user.displayName);
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
          <section className="my-16 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4 p-2 border-yellow-400">
              Videos
            </h3>
            <div className="flex overflow-scroll gap-4 my-8 w-full">
              {movieVideos.slice(0, 4).map((video) => (
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen
                  title="video"
                  className="flex-shrink-0 w-full max-w-xl min-h-[360px]"
                />
              ))}
            </div>
          </section>
        )}
        {movieImages && (
          <section className="my-16 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4  p-2 border-yellow-400">
              Photos
            </h3>
            <div className="flex overflow-scroll gap-4 my-8">
              {movieImages.backdrops.slice(0, 12).map((image) => (
                <div className="shrink-0">
                  <img
                    src={getTMDBImage(image.file_path)}
                    alt="Movie"
                    className="w-96 h-96 object-cover"
                  />
                </div>
              ))}
            </div>
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
                <div className="my-4">⭐ {review.stars}/10</div>
                <p className="my-4 text-justify">{review.content}</p>
                <p>
                  {review.author} • {review.date}
                </p>
              </section>
            );
          })}
        </section>
        <ReviewPopup movieDetails={movieDetails} />
      </>
    )
  );
}
