import { getTMDBImage } from "../helpers";
import { Link } from "react-router-dom";

export default function MoviesList({ movies }) {
  return (
    <article className="flex flex-wrap xl:flex-nowrap gap-8 justify-center md:justify-between my-4">
      {movies.map((movie, index) => {
        return (
          <Link to={`/movie/${movies[index].id}`}>
            <div className="flex-intial xl:flex-1" key={index}>
              <img
                src={getTMDBImage(movie.poster_path)}
                alt="Movie Poster"
                className="max-h-96"
              />
            </div>
          </Link>
        );
      })}
    </article>
  );
}
