"use client"

import { useEffect, useState } from "react"
import { auth } from "../../utilis/firebase"
import { getWatchLater, removeFromWatchLater } from "../../utilis/watchLater"
import { useNavigate } from "react-router-dom"

export default function WatchLater() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const fetchWatchLaterList = async () => {
    if (!auth.currentUser) {
      setMovies([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const list = await getWatchLater(auth.currentUser.uid)
      setMovies(list)
    } catch (error) {
      console.error("Error fetching Watch Later:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWatchLaterList()
  }, [])

  const handleRemove = async (item) => {
    try {
      await removeFromWatchLater(auth.currentUser.uid, item.id)
      // Refresh list immediately
      fetchWatchLaterList()
    } catch (error) {
      console.error("Error removing:", error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-purple-400 text-xl">Loading...</div>
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-x-hidden">
      {/* Top Bar */}
      <div className="w-full bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border-b border-purple-900/30 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="ri-arrow-left-line text-xl"></i>
              <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-white">Watch Later</h2>
          </div>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-purple-400">
          <i className="ri-emotion-sad-line text-6xl mb-4"></i>
          <p className="text-lg">No movies or TV shows saved.</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {movies.map((item) => (
            <div
              key={item.id}
              className="relative group bg-purple-900/20 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                alt={item.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <h2 className="text-white text-sm font-semibold truncate">{item.title}</h2>
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-600/70 hover:bg-red-600 px-3 py-1 rounded-lg text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
