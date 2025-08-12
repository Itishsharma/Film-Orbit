import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import TrailerPlayer from "../components/TrailerPlayer"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState("")

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos`
      )
      setMovie(res.data)

      const trailer = res.data.videos.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      )
      setTrailerKey(trailer?.key || "")
    }

    fetchDetails()
  }, [id])

  if (!movie) return <div className="text-white text-center mt-8">Loading...</div>

  return (
    <div className="p-4 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-sm mb-2 text-gray-300">⭐ {movie.vote_average} | ⏱ {movie.runtime} mins</p>
      <button
        onClick={() => toggleWatchlist(movie)}
        className="bg-orange-500 mt-4 px-4 py-2 rounded text-black font-bold hover:bg-orange-600"
      >
        Add/Remove from Watchlist
      </button>
      <Link
        to={`/reviews/${movie.id}`}
        className="text-sm underline mt-2 text-gray-300 inline-block"
      >
        See User Reviews
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres.map((g) => (
          <span key={g.id} className="px-2 py-1 bg-primary rounded text-sm">
            {g.name}
          </span>
        ))}
      </div>
      <p className="mb-4">{movie.overview}</p>

      {trailerKey ? (
        <TrailerPlayer trailerKey={trailerKey} />
      ) : (
        <p className="text-gray-400 italic">No trailer available</p>
      )}
    </div>

  )

}

export default MovieDetails
