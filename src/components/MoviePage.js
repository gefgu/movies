import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMoviePoster,
  convertMinutesIntoHoursAndMinutes,
  getMovieBackdrop,
} from "../helpers";

export default function MoviePage() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const { movieId } = useParams();
  // 338953 - Fantastic Beasts 3 id

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [movieImages, setMovieImages] = useState(null);

  const getMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    // console.log(data);
    setMovieDetails(data);
  };

  const getMovieVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data.results);
    setMovieVideos(data.results);
  };

  const getMovieImages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${MOVIE_API_KEY}`
    );
    const data = await response.json();
    setMovieImages(data);
  };

  const getMovieTrailers = (movieVideos) => {
    return movieVideos.filter(
      (video) => video.type.toLowerCase() === "trailer"
    );
  };

  useEffect(() => {
    getMovieDetails();
    getMovieVideos();
    getMovieImages();
  }, []);

  return (
    movieDetails && (
      <>
        <section className="p-4 bg-stone-800 text-white xl:px-64 2xl:px-96">
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
          <div className="py-8 flex flex-wrap justify-center md:justify-between md:flex-nowrap gap-8">
            <img
              src={getMoviePoster(movieDetails)}
              alt="Movie Poster"
              className="max-w-xs"
            />
            {movieVideos && (
              <iframe
                src={`https://www.youtube.com/embed/${
                  getMovieTrailers(movieVideos)[0].key
                }`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                className="w-full max-w-3xl min-h-[480px]"
              />
            )}
          </div>
          <div className="text-white flex flex-wrap gap-4">
            {movieDetails.genres.map((genre) => {
              return (
                <span
                  className="border-2 px-4 py-2 rounded-full"
                  key={genre.name}
                >
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className="my-6 text-lg">
            <p>{movieDetails.overview}</p>
          </div>
        </section>
        {movieVideos && (
          <section className="my-12 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4  p-2 border-yellow-400">
              Videos
            </h3>
            <div className="flex overflow-scroll gap-4 my-4 w-full">
              {movieVideos.slice(0, 4).map((video) => (
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  className="flex-shrink-0 w-full max-w-xl min-h-[360px]"
                />
              ))}
            </div>
          </section>
        )}
        {movieImages && (
          <section className="my-12 mx-4 xl:px-64 2xl:px-96">
            <h3 className="text-3xl border-l-4  p-2 border-yellow-400">
              Photos
            </h3>
            <div className="flex overflow-scroll gap-4 my-4">
              {movieImages.backdrops.slice(0, 12).map((image) => (
                <div className="shrink-0">
                  <img
                    src={getMovieBackdrop(image.file_path)}
                    alt="Movie"
                    className="w-96 h-96 object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </>
    )
  );
}
