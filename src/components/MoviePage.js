import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviePoster, convertMinutesIntoHoursAndMinutes } from "../helpers";

export default function MoviePage() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const { movieId } = useParams();
  // 338953 - Fantastic Beasts 3 id

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);

  const getMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data);
    setMovieDetails(data);
  };

  const getMovieVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data.results);
    setMovieVideos(data.results);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
  }, []);

  return (
    movieDetails && (
      <section className="p-4 bg-stone-800 text-white xl:px-64">
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
        <div className="py-8 flex gap-8">
          <img
            src={getMoviePoster(movieDetails)}
            alt="Movie Poster"
            className="max-h-96"
          />
          {movieVideos && (
            <iframe
              src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              className="w-full max-w-3xl"
            />
          )}
        </div>
      </section>
    )
  );
}