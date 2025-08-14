import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ movie }){
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''
  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} className="block">
        {poster ? <img src={poster} alt={movie.title} className="w-full h-64 object-cover rounded-md mb-3" /> : null}
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-muted/80">{movie.release_date?.slice(0,4)} • ⭐ {movie.vote_average?.toFixed?.(1) ?? movie.vote_average}</p>
      </Link>
    </div>
  )
}
