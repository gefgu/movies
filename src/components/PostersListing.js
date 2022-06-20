import { Link } from "react-router-dom";
import { getMoviesPosters } from "../helpers";

export default function PostersListing({ listingTitle, movies }) {
  const posters = getMoviesPosters(movies);
  return (
    <section className="py-8">
      <h3 className="text-white text-xl">{listingTitle}</h3>
      <hr className="my-2" />
      <article className="flex flex-wrap xl:flex-nowrap gap-8 justify-center md:justify-between my-4">
        {posters.map((path, index) => {
          return (
            <Link to={`/movie/${movies[index].id}`}>
              <div className="flex-intial xl:flex-1" key={index}>
                <img src={path} alt="Movie Poster" className="max-h-96" />
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
}
