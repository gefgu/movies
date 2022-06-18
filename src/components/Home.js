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
          linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%),
          url(${heroImage})`,
        }}
      >
        <h2 className="drop-shadow">
          Track films you've watched
          <br />
          Save those you want to see
          <br />
          Tell your friends what's good
          <br />
        </h2>
        <button className="rounded px-4 py-2 bg-stone-400">
          Create An Account
        </button>
      </div>
    </main>
  );
}
