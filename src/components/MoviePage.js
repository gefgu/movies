import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertMinutesIntoHoursAndMinutes } from "../helpers";

export default function MoviePage() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const { movieId } = useParams();
  // 338953 - Fantastic Beasts 3 id

  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data);
    setMovieDetails(data);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    movieDetails && (
      <section className="p-4 bg-stone-800 text-white">
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
      </section>
    )
  );
}
