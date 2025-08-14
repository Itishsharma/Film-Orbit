import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, addToWatchlist } from '../api/api'

export default function MovieDetail(){
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(()=>{
    (async ()=>{
      const data = await getMovieDetails(id)
      setMovie(data)
    })()
  }, [id])

  const add = async () => {
    if(!token) { alert('Please login first'); return }
    await addToWatchlist(token, {
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    })
    alert('Added to watchlist')
  }

  if(!movie) return <div>Loading…</div>

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        {poster ? <img src={poster} alt={movie.title} className="rounded-xl2 w-full" /> : null}
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-muted mb-3">{movie.release_date} • {movie.runtime}m • {movie.original_language}</p>
        <p className="mb-4">{movie.overview}</p>
        <div className="flex gap-2 mb-4">
          {movie.genres?.map(g => <span key={g.id} className="px-3 py-1 bg-dark/60 rounded-md">{g.name}</span>)}
        </div>
        <button onClick={add} className="btn-accent">Add to Watchlist</button>
      </div>
    </div>
  )
}
