import icon from "../assets/tmdb.svg";

export default function Footer() {
  return (
    <footer className="h-12 bg-stone-900 border-t-2 border-stone-600 flex justify-center items-center text-white">
      <p className="flex items-center gap-2">
        Data provided by{" "}
        <a href="https://www.themoviedb.org/">
          <img src={icon} alt="TMDB's icon" className="h-4" />
        </a>{" "}
      </p>
    </footer>
  );
}
