const getMovieBackdrop = (backdrop_path) => {
  const imagePath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
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

const convertMinutesIntoHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes - hours * 60;
  return { hours: hours, minutes: remainingMinutes };
};

export {
  getMovieBackdrop,
  getMoviePoster,
  getMoviesPosters,
  convertMinutesIntoHoursAndMinutes,
};
