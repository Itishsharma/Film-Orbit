import axios from 'axios';

const API_KEY = "ad9492757d2a1b3ff158b27b77aeea62"; 
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchPopularMovies = () => {
  return tmdb.get('/movie/popular');
};

export const fetchMovieDetails = (movieId) => {
  return tmdb.get(`/movie/${movieId}`);
};

export const searchMovies = (query) => {
  return tmdb.get('/search/movie', {
    params: {
      query,
    },
  });
};