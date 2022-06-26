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

const getMovieDetails = async (movieId, MOVIE_API_KEY) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=en-US`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export {
  getTMDBImage,
  getMoviesPosters,
  convertMinutesIntoHoursAndMinutes,
  getMovieDetails,
};
