export default function PostersListing({ posters }) {
  return (
    <article className="flex flex-wrap gap-8 justify-center md:justify-between">
      {posters.map((path, index) => {
        return (
          <img
            src={path}
            alt="Movie Poster"
            key={index}
            className="max-h-96"
          />
        );
      })}
    </article>
  );
}
