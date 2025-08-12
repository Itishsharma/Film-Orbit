import { useEffect, useState } from "react"
import { getWatchlist } from "../utils/localStorage"
import MovieCard from "../components/MovieCard"

const Watchlist = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    setMovies(getWatchlist())
  }, [])

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist
