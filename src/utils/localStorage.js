export const getReviews = () =>
  JSON.parse(localStorage.getItem("reviews")) || {}

export const saveReview = (movieId, reviewObj) => {
  const data = getReviews()
  if (!data[movieId]) data[movieId] = []
  data[movieId].push(reviewObj)
  localStorage.setItem("reviews", JSON.stringify(data))
}

export const getWatchlist = () =>
  JSON.parse(localStorage.getItem("watchlist")) || []

export const toggleWatchlist = (movie) => {
  let list = getWatchlist()
  const exists = list.find((m) => m.id === movie.id)
  if (exists) list = list.filter((m) => m.id !== movie.id)
  else list.push(movie)
  localStorage.setItem("watchlist", JSON.stringify(list))
}
