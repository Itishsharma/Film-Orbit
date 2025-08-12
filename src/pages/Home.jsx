import { useEffect, useState } from "react"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import GenreFilter from "../components/GenreFilter"
import SearchBar from "../components/SearchBar"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const fetchPopular = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
    setMovies(res.data.results)
    setFiltered(res.data.results)
  }

  const searchMovies = async () => {
    if (!searchTerm.trim()) return fetchPopular()

    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
    setMovies(res.data.results)
    setFiltered(res.data.results)
  }

  useEffect(() => {
    fetchPopular()
  }, [])

  useEffect(() => {
    let filteredList = [...movies]

    if (selectedGenre) {
      filteredList = filteredList.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      )
    }

    if (searchTerm.trim()) {
      filteredList = filteredList.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFiltered(filteredList)
  }, [selectedGenre, searchTerm, movies])

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Home
