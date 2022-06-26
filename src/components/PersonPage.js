import { compareDesc, format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTMDBImage } from "../helpers";
import Carousel from "./Carousel";

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
    console.log(data);
    setPersonData(data);
  };

  const getPersonCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    let credits = data.cast;
    credits = credits.filter((credit) => credit.release_date);
    // credits.sort((a, b) => {
    //   return compareDesc(new Date(a.release_date), new Date(b.release_date));
    // });
    console.log(credits);
    setPersonCredits(credits);
  };

  const getPersonImages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/images?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data.profiles);
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
    </main>
  );
}
