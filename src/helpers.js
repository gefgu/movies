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

const getMovieDetails = async (movieId, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  );
  const data = await response.json();
  return data;
};

const getPopularMovies = async (apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const dataListing = await response.json();
  return dataListing.results;
};

const getTopRatedMovies = async (apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const dataListing = await response.json();
  return dataListing.results;
};

const getMovieVideos = async (movieId, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
  );
  const data = await response.json();
  if (data.results.length > 0) return data.results;
};

const getMovieImages = async (movieId, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

const getMovieCast = async (movieId, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.cast;
};

const getSimilarMovies = async (movieId, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
};

export {
  getTMDBImage,
  getMoviesPosters,
  convertMinutesIntoHoursAndMinutes,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getMovieVideos,
  getMovieImages,
  getMovieCast,
  getSimilarMovies,
};
