import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  console.log(movieId);

  return <div>Movie Page</div>;
}
