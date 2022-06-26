import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    console.log(data.cast);
    setPersonCredits(data.cast);
  };

  const getPersonImages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/images?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data.profiles);
    setPersonCredits(data.profiles);
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
    personData && (
      <section>
        <h2>{personData.name}</h2>
      </section>
    )
  );
}
