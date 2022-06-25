import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PersonPage() {
  const { personId } = useParams();
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [personData, setPersonData] = useState(null);

  const getPersonData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${MOVIE_API_KEY}&language=en-US`
    );
    const data = await response.json();
    console.log(data);
    setPersonData(data);
  };

  useEffect(() => {
    getPersonData();

    return () => setPersonData(null);
  });

  return <div>Actor Page - {personId}</div>;
}
