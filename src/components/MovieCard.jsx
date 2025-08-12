import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>

      <div className="bg-black rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform border border-border">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-2">
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-400">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
