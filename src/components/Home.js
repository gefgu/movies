import { useEffect, useState } from "react";

export default function Home() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [heroImage, setHeroImage] = useState(null);

  const getTopOneMovieImage = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
    );
    const dataListing = await response.json();
    const topOneMovie = dataListing.results[0];
    const imagePath = `https://image.tmdb.org/t/p/original/${topOneMovie.backdrop_path}`;
    setHeroImage(imagePath);
  };

  useEffect(() => {
    getTopOneMovieImage();
  }, []);

  return (
    <main>
      <div
        className={`w-full min-h-screen bg-cover bg-center bg-no-repeat 
        text-white flex flex-col justify-end 
        items-center`}
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
          url(${heroImage})`,
        }}
      >
        <div className="flex flex-col my-14 text-justify">
          <h2 className="drop-shadow-md text-3xl my-2 font-bold">
            Track films you've watched
          </h2>
          <h2 className="drop-shadow-md text-3xl my-2 font-bold">
            Save those you want to see
          </h2>
          <h2 className="drop-shadow-md text-3xl my-2 font-bold">
            Tell your friends what's good
          </h2>
          <button className="rounded px-4 py-2 my-4 bg-stone-900 font-bold text-xl hover:bg-stone-800 active:bg-stone-700 drop-shadow-md">
            Create An Account
          </button>
        </div>
      </div>
    </main>
  );
}
