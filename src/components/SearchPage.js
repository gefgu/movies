import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSearchResults, getTMDBImage } from "../helpers";

export default function SearchPage() {
  const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const searchQuery = useParams().searchQuery.replaceAll("+", " ");

  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    getSearchResults(searchQuery, MOVIE_API_KEY).then((data) =>
      setSearchResults(data)
    );

    return () => {
      setSearchResults(null);
    };
  }, [searchQuery]);

  return (
    <section className="p-8 xl:px-64 2xl:px-96">
      <h2 className="text-2xl mb-8 border-b-2">Results for "{searchQuery}"</h2>
      <div className="grid grid-cols-1 gap-16">
        {searchResults ? (
          searchResults.map((searchResult) => (
            <section
              className="grid grid-cols-[200px_1fr] sm:gap-2 md:gap-8"
              key={searchResult.id}
            >
              <Link to={`../movie/${searchResult.id}`}>
                <img
                  src={getTMDBImage(searchResult.poster_path)}
                  alt="Movie Poster"
                  className="h-56"
                />
              </Link>

              <div>
                <Link to={`../movie/${searchResult.id}`}>
                  <h3 className="text-xl my-2 hover:text-yellow-800 active:text-yellow-700">
                    {searchResult.title}
                  </h3>
                </Link>
                <p>{searchResult.overview}</p>
              </div>
            </section>
          ))
        ) : (
          <p className="text-xl">No Results Found.</p>
        )}
      </div>
    </section>
  );
}
