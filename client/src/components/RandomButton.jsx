import React, { useState } from 'react'
import { getRandomMovie } from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function RandomButton(){
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const pick = async () => {
    setLoading(true)
    try {
      const movie = await getRandomMovie()
      if (movie?.id) navigate(`/movie/${movie.id}`)
    } catch {
      alert('Could not fetch random movie')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={pick} className="btn-accent">
      {loading ? 'Picking…' : 'Surprise Me 🎲'}
    </button>
  )
}
