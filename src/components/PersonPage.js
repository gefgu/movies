import { compareDesc, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTMDBImage } from "../helpers";
import Carousel from "./Carousel";
import MoviesList from "./MoviesList";

export default function PersonPage() {
  const { personId } = useParams();
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [personData, setPersonData] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);
  const [personImages, setPersonImages] = useState(null);

  const getPersonData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    setPersonData(data);
  };

  const getPersonCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    let credits = data.cast;
    credits = credits.filter((credit) => credit.release_date);
    credits = credits.filter((credit) => credit.character);
    setPersonCredits(credits);
  };

  const getPersonImages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/images?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    setPersonImages(data.profiles);
  };

  useEffect(() => {
    getPersonData();
    getPersonCredits();
    getPersonImages();

    return () => {
      setPersonData(null);
      setPersonCredits(null);
      setPersonImages(null);
    };
  }, [personId]);

  return (
    <main>
      {personData && (
        <section className="my-8 mx-4 xl:mx-64 2xl:mx-96 border rounded p-4">
          <h2 className="text-3xl">{personData.name}</h2>
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-8 my-4">
            <img
              src={getTMDBImage(personData.profile_path)}
              alt="Profile"
              className="h-96"
            />
            <p className="text-justify">{personData.biography}</p>
          </div>
          <p>
            <strong className="mr-2">Born:</strong>{" "}
            {format(new Date(personData.birthday), "MMMM d, y")} in{" "}
            {personData.place_of_birth}{" "}
          </p>
        </section>
      )}
      {personImages && (
        <section className="my-8 mx-4 xl:mx-64 2xl:mx-96 border rounded p-4 relative">
          <h2 className="text-3xl">Photos</h2>

          <Carousel
            imagesInDisplay={personImages.length}
            listing={personImages.map((image) => (
              <img
                src={getTMDBImage(image.file_path)}
                alt="Movie"
                className="h-96 object-cover"
                key={image.file_path}
              />
            ))}
          />
        </section>
      )}
      {personCredits && (
        <section className="my-8 mx-4 xl:mx-64 2xl:mx-96 border rounded p-4 relative">
          <h2 className="text-3xl">Know For</h2>

          <MoviesList
            movies={personCredits
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 4)}
          />
        </section>
      )}

      {personCredits && (
        <section className="my-8 mx-4 xl:mx-64 2xl:mx-96 border rounded p-4 relative">
          <h2 className="text-3xl">Filmography</h2>
          <div className="flex flex-col gap-4 my-4">
            {personCredits
              .sort((a, b) =>
                compareDesc(new Date(a.release_date), new Date(b.release_date))
              )
              .map((credit) => {
                return (
                  <article>
                    <div className="flex justify-between">
                      <Link to={`../movie/${credit.id}`} className="text-blue-700 hover:text-blue-800 active:text-blue-900">
                        <h3 className="text-xl">
                          {credit.title}
                        </h3>
                      </Link>
                      <p>{credit.release_date.split("-")[0]}</p>
                    </div>
                    <p className="text-sm">{credit.character}</p>
                  </article>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
}
