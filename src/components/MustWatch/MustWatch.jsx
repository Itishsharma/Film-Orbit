// MustWatch.jsx
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 w-full">
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
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold rounded-full shadow-lg transition"
          >
            Load More {type === "movie" ? "Movies" : "TV Shows"}
          </button>
        </div>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
      <div className="w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>
          <h2 className="text-3xl font-bold">
            Trending <span className="text-gray-300">All</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "movies"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "tv"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/10 text-gray-300 backdrop-blur-md hover:bg-white/20"
            }`}
          >
            TV Shows
          </button>
        </div>

        {/* Content */}
        <div className="w-full">
          {activeTab === "movies"
            ? renderCards(movies, "movie")
            : renderCards(tvShows, "tv")}
        </div>
      </div>
    </div>
  )
}