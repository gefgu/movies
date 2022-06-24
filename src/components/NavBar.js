import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ signInUser, signOutUser, user }) {
  const navigate = useNavigate();
  const searchBar = useRef();

  const search = (e) => {
    e.preventDefault();
    const searchQuery = searchBar.current.value.replaceAll(" ", "+");
    if (searchQuery > 0) navigate(`search/${searchQuery}`);
  };

  return (
    <nav className="flex bg-stone-900 text-white px-6 py-1 items-center h-16 gap-2 sm:gap-4 w-full xl:px-64 2xl:px-96">
      <Link to="/">
        <h1 className="p-2 text-xl font-bold uppercase">Movies</h1>
      </Link>
      <form className="flex flex-1 items-center gap-4 justify-center">
        <input
          ref={searchBar}
          name="search"
          type="text"
          className="border-2 text-black flex-1 py-1 px-2 hidden sm:block"
          placeholder="Search Movies"
        />
        <button
          onClick={search}
          className="p-2 rounded hover:bg-stone-800 active:bg-stone-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      <div className="border w-px h-4/5"></div>
      {user ? (
        <div className="flex items-center relative">
          <button className="hover:bg-stone-800 active:bg-stone-700 p-2 rounded">
            {user.displayName}
          </button>
          <div className="absolute top-10 left-0 flex justify-center py-2 w-full bg-stone-900 z-20">
            <button
              className="p-2 text-md rounded hover:bg-stone-800 active:bg-stone-700"
              onClick={signOutUser}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button
          className="p-2 rounded hover:bg-stone-800 active:bg-stone-700"
          onClick={signInUser}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
