export default function PostersListing({ posters }) {
  return (
    <article>
      {posters.map((path, index) => {
        return (
          <img
            src={path}
            alt="Movie Poster"
            key={index}
            className="flex-initial"
          />
        );
      })}
    </article>
  );
}
