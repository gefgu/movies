export default function PostersListing({ listingTitle, posters }) {
  return (
    <section className="py-8">
      <h3 className="text-white text-xl">{listingTitle}</h3>
      <hr className="my-2" />
      <article className="flex flex-wrap xl:flex-nowrap gap-8 justify-center md:justify-between my-4">
        {posters.map((path, index) => {
          return (
            <div className="flex-intial xl:flex-1" key={index}>
              <img src={path} alt="Movie Poster" className="max-h-96" />
            </div>
          );
        })}
      </article>
    </section>
  );
}
