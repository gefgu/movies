import tmdbIcon from "../assets/tmdb.svg";
import githubIcon from "../assets/GitHub-Mark-Light-64px.png";

export default function Footer() {
  return (
    <footer className="h-12 bg-stone-900 border-t-2 border-stone-600 flex gap-16 justify-center items-center text-white">
      <p className="flex items-center gap-2">
        Data provided by{" "}
        <a href="https://www.themoviedb.org/">
          <img src={tmdbIcon} alt="TMDB's icon" className="h-4" />
        </a>{" "}
      </p>

      <a href="https://github.com/gefgu/movies">
        <img src={githubIcon} alt="Github Icon" className="h-8" />
      </a>
    </footer>
  );
}
