import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex bg-stone-900 text-white px-6 py-1 items-center h-16 gap-4 w-full lg:px-64">
      <button className="p-2 rounded text-white hover:bg-stone-800 active:bg-stone-700">
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <Link to="/"><h1 className="p-2 text-xl font-bold uppercase">Movies</h1></Link>
      <form className="flex flex-1 items-center gap-4 justify-center">
        <input
          name="search"
          type="text"
          className="border-2 text-black flex-1 py-1 px-2 hidden sm:block"
          placeholder="Search Movies"
        />
        <button className="p-2 rounded hover:bg-stone-800 active:bg-stone-700">
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
      <button className="p-2 rounded hover:bg-stone-800 active:bg-stone-700">
        Sign In
      </button>
    </nav>
  );
}
