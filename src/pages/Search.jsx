import { useEffect, useState } from "react"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import Filters from "../components/Filters"

const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" })

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${query}`
      )
      let filtered = res.data.results

      if (filters.genre) {
        filtered = filtered.filter((movie) =>
          movie.genre_ids.includes(parseInt(filters.genre))
        )
      }
      if (filters.year) {
        filtered = filtered.filter(
          (movie) => movie.release_date?.slice(0, 4) === filters.year
        )
      }
      if (filters.rating) {
        filtered = filtered.filter(
          (movie) => movie.vote_average >= parseFloat(filters.rating)
        )
      }

      setResults(filtered)
    }

    if (query.trim()) fetchResults()
    else setResults([])
  }, [query, filters])

  return (
    <div className="text-white p-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-2 rounded bg-zinc-800 mb-4 text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Filters filters={filters} setFilters={setFilters} />

      {results.length === 0 && query ? (
        <p className="mt-4 text-gray-400 text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
