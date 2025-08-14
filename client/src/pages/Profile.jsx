import React, { useEffect, useState } from 'react'
import { getWatchlist, removeFromWatchlist } from '../api/api'
import { Link } from 'react-router-dom'

export default function Profile(){
  const [list, setList] = useState([])
  const token = localStorage.getItem('token')

  async function load(){
    if(!token) return
    const data = await getWatchlist(token)
    setList(data || [])
  }

  useEffect(()=>{ load() }, [])

  const removeItem = async (movieId) => {
    await removeFromWatchlist(token, movieId)
    setList(l => l.filter(i => i.movieId !== Number(movieId)))
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map(item => (
          <div className="card" key={item._id}>
            <Link to={`/movie/${item.movieId}`}>
              {item.poster_path && <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} className="w-full h-64 object-cover rounded-md mb-3" />}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </Link>
            <button onClick={()=>removeItem(item.movieId)} className="mt-3 btn-accent">Remove</button>
          </div>
        ))}
      </div>
      {!token && <p className="mt-4 text-muted">Login to view your watchlist.</p>}
    </div>
  )
}
