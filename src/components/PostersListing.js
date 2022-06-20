import MoviesList from "./MoviesList";

export default function PostersListing({ listingTitle, movies }) {
  return (
    <section className="py-8">
      <h3 className="text-white text-xl">{listingTitle}</h3>
      <hr className="my-2" />
      <MoviesList movies={movies} />
    </section>
  );
}
