import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

export default function MustWatch() {
  const [activeTab, setActiveTab] = useState("movies")
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [moviePage, setMoviePage] = useState(1)
  const [tvPage, setTvPage] = useState(1)
  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const fetchMovies = async (page = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=${API_KEY}&page=${page}`
    )
    const data = await res.json()
    setMovies((prev) => [...prev, ...data.results])
  }

  const fetchTvShows = async (page = 1) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
    )
    const data = await res.json()
    setTvShows((prev) => [...prev, ...data.results])
  }

  useEffect(() => {
    fetchMovies(moviePage)
    fetchTvShows(tvPage)
  }, [API_KEY])

  const renderCards = (items, type) => (
    <>
      {/* 5 cards per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
        {items.slice(0, 100).map((item) => (
          <a
            key={item.id}
            href={`https://www.themoviedb.org/${type}/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-2xl overflow-hidden group shadow-lg hover:scale-105 transition transform duration-300 w-full"
          >
            <img
              src={
                item.poster_path
                  ? `${TMDB_IMAGE_BASE}${item.poster_path}`
                  : "/noimg.jpg"
              }
              alt={item.title || item.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-b from-black/60 to-black/90 backdrop-blur-md rounded-xl p-3 shadow-md">
              <h3 className="text-white text-sm font-semibold truncate">
                {item.title || item.name}
              </h3>
              <p className="text-gray-300 text-xs">
                {type === "movie"
                  ? item.release_date?.slice(0, 4) || "N/A"
                  : item.first_air_date?.slice(0, 4) || "N/A"}
              </p>
              <p className="text-gray-400 text-xs mb-1">
                {type === "movie" ? "Movie" : "TV Show"}
              </p>
              <p className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-400/80 text-black">
                {Math.round(item.vote_average * 10)}%
              </p>
            </div>
          </a>
        ))}
      </div>

      {items.length < 100 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() =>
              type === "movie"
                ? (setMoviePage((p) => p + 1), fetchMovies(moviePage + 1))
                : (setTvPage((p) => p + 1), fetchTvShows(tvPage + 1))
            }
            className="px-6 py-2 bg-gradient-to-r from-purple-700 to-purple-800 hover:opacity-90 text-white font-semibold rounded-full shadow-lg transition"
          >
            Load More {type === "movie" ? "Movies" : "TV Shows"}
          </button>
        </div>
      )}
    </>
  )

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
            <span className="font-medium">Back</span>
          </button>
          <h2 className="text-3xl font-bold text-white">Must Watch</h2>
          </div>
        </div>
      </div>

      {/* Gradient Sub-header */}
     <div className="flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Must-Watch Vault
              </span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg">Watch Before You Die!</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-0 space-x-8">
  <button
    onClick={() => setActiveTab("movies")}
    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 
      ${activeTab === "movies"
        ? "bg-gradient-to-r from-blue-800 to-purple-800 text-white shadow-lg shadow-purple-500/30 scale-105"
        : "bg-white/5 text-gray-300 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:scale-105"}`}
  >
    <span className="relative z-10">🎬 Movies</span>
  </button>

  <button
    onClick={() => setActiveTab("tv")}
    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 
      ${activeTab === "tv"
        ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white shadow-lg shadow-purple-500/30 scale-105"
        : "bg-white/5 text-gray-300 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:scale-105"}`}
  >
    <span className="relative z-10">📺 TV Shows</span>
  </button>
</div>


      {/* Content */}
      <div className="w-full px-8 py-6">
        {activeTab === "movies"
          ? renderCards(movies, "movie")
          : renderCards(tvShows, "tv")}
      </div>
    </div>
  )
}
