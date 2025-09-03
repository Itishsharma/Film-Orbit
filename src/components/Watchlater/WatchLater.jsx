"use client"

import { useEffect, useState } from "react"
import { auth } from "../../utilis/firebase"
import { getWatchLater, removeFromWatchLater } from "../../utilis/WatchLater"
import Loader from "../Loader"

export default function WatchLater() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchList = async () => {
      if (!auth.currentUser) {
        setMovies([])
        setLoading(false)
        return
      }
      const list = await getWatchLater()
      setMovies(list)
      setLoading(false)
    }

    fetchList()
  }, [])

  const handleRemove = async (id) => {
    await removeFromWatchLater(id)
    setMovies((prev) => prev.filter((m) => m.id !== id))
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          My Watch Later
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No movies or shows in your Watch Later list yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((item) => (
              <div
                key={item.id}
                className="bg-purple-900/20 border border-purple-500/20 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                {item.poster ? (
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-4 py-2 w-full rounded-lg bg-red-600/30 text-red-300 hover:bg-red-600/50 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}