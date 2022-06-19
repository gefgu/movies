const getMovieBackdrop = (movie) => {
  const imagePath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  return imagePath;
};

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
};

const getMoviesPosters = (movies) => {
  const postersArray = movies.map((movie) => {
    return getMoviePoster(movie);
  });

  return postersArray;
};

export { getMovieBackdrop, getMoviePoster, getMoviesPosters };
