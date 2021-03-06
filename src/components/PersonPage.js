import { compareDesc, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPersonCredits,
  getPersonData,
  getPersonImages,
  getTMDBImage,
} from "../helpers";
import Carousel from "./Carousel";
import MoviesList from "./MoviesList";

export default function PersonPage() {
  const { personId } = useParams();
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [personData, setPersonData] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);
  const [personImages, setPersonImages] = useState(null);

  useEffect(() => {
    getPersonData(personId, MOVIE_API_KEY).then((data) => setPersonData(data));
    getPersonCredits(personId, MOVIE_API_KEY).then((data) =>
      setPersonCredits(data)
    );
    getPersonImages(personId, MOVIE_API_KEY).then((data) =>
      setPersonImages(data)
    );

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
                      <Link
                        to={`../movie/${credit.id}`}
                        className="text-blue-700 hover:text-blue-800 active:text-blue-900"
                      >
                        <h3 className="text-xl">{credit.title}</h3>
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
