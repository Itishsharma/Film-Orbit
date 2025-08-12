import { useEffect, useState } from "react"
import axios from "axios"

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      setGenres(res.data.genres)
    }
    fetchGenres()
  }, [])

  return (
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      className="w-full max-w-xs p-2 rounded-md border border-border bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">🎬 All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  )
}

export default GenreFilter
