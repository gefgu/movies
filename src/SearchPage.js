import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const searchQuery = useParams().searchQuery.replaceAll("+", " ");

  const [searchResults, setSearchResults] = useState(null);

  const getSearchResults = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${query.replaceAll(
        " ",
        "%20"
      )}&page=1&include_adult=false`
    );
    const data = await response.json();
    console.log(data.results);
    setSearchResults(data.results);
  };

  useEffect(() => {
    getSearchResults(searchQuery);

    return () => {
      setSearchResults(null);
    };
  }, []);

  return <div>{searchQuery}</div>;
}
