import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api'
})

// movies (from backend -> tmdb)
export const getPopular = (page=1) => api.get(`/movies/popular?page=${page}`).then(r=>r.data)
export const searchMovies = (q) => api.get(`/movies/search?q=${encodeURIComponent(q)}`).then(r=>r.data)
export const getMovieDetails = (id) => api.get(`/movies/${id}`).then(r=>r.data)
export const getRandomMovie = () => api.get(`/movies/random`).then(r=>r.data)

// auth
export const login = (email, password) => api.post('/auth/login', { email, password }).then(r=>r.data)
export const register = (name, email, password) => api.post('/auth/register', { name, email, password }).then(r=>r.data)

// watchlist
export const addToWatchlist = (token, item) =>
  api.post('/watchlist', item, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.data)
export const getWatchlist = (token) =>
  api.get('/watchlist', { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.data)
export const removeFromWatchlist = (token, movieId) =>
  api.delete(`/watchlist/${movieId}`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.data)

export default api
