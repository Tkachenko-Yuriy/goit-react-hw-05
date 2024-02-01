import axios from "axios";

const BASE_URL = "https://api.themoviedb.org";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzBmNjJhMzE2MTgzM2IyOWYzNTM0ZWYxZDE4ZDVhNiIsInN1YiI6IjY1NjliMzRmNjM1MzZhMDBjNDJhOTRhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6n_PVw8L5YbP5E4yWe4QgSA4ZnMDGxzBFCiqZdJHBc",
  },
};

const fetchCreditsMovie = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/3/movie/${movieId}/credits`, {
    headers: options.headers,
    params: {
      language: "uk-UK",
    },
  });

  return response.data;
};

export default fetchCreditsMovie;
