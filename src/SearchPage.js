import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTMDBImage } from "./helpers";

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
    const results = data.results.filter((result) => result.poster_path)
    console.log(results);
    setSearchResults(results);
  };

  useEffect(() => {
    getSearchResults(searchQuery);

    return () => {
      setSearchResults(null);
    };
  }, [searchQuery]);

  return (
    <section className="p-8 xl:px-64 2xl:px-96">
      <h2 className="text-2xl mb-8 border-b-2">Results for "{searchQuery}"</h2>
      <div className="grid grid-cols-1 gap-16">
        {searchResults &&
          searchResults.map((searchResult) => (
            <section className="flex gap-8" key={searchResult.id}>
              <img
                src={getTMDBImage(searchResult.poster_path)}
                alt="Movie Poster"
                className="h-56"
              />

              <div>
                <h3 className="text-xl my-2">{searchResult.title}</h3>
                <p>{searchResult.overview}</p>
              </div>
            </section>
          ))}
      </div>
    </section>
  );
}
