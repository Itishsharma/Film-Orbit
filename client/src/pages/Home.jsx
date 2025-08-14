import React, { useEffect, useState } from 'react'
import { getPopular, searchMovies } from '../api/api'
import MovieCard from '../components/MovieCard'
import RandomButton from '../components/RandomButton'

export default function Home(){
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(()=> { load() }, [page])

  async function load(){
    const data = await getPopular(page)
    setMovies(data.results || [])
  }

  async function doSearch(e){
    e.preventDefault()
    if(!query) { load(); return }
    const data = await searchMovies(query)
    setMovies(data.results || [])
  }

  return (
    <div>
      <div className="flex gap-3 items-center mb-6">
        <form onSubmit={doSearch} className="flex gap-2 flex-1">
          <input value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Search movies, actors, genres…"
            className="w-full p-3 rounded-xl2 bg-dark/70 placeholder:text-muted border border-transparent focus:outline-none" />
          <button type="submit" className="btn-accent">Search</button>
        </form>
        <RandomButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={()=>setPage(p => Math.max(1, p-1))} className="btn-accent">Prev</button>
        <span>Page {page}</span>
        <button onClick={()=>setPage(p => p+1)} className="btn-accent">Next</button>
      </div>
    </div>
  )
}
