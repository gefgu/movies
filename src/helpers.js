const getTMDBImage = (path) => {
  const imagePath = `https://image.tmdb.org/t/p/original/${path}`;
  return imagePath;
};

const getMoviesPosters = (movies) => {
  const postersArray = movies.map((movie) => {
    return getTMDBImage(movie.poster_path);
  });

  return postersArray;
};

const convertMinutesIntoHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes - hours * 60;
  return { hours: hours, minutes: remainingMinutes };
};

export { getTMDBImage, getMoviesPosters, convertMinutesIntoHoursAndMinutes };
