"use client"
import { useState, useRef } from "react"
import axios from "axios"

const MOVIE_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10752, name: "War" },
]

const TV_GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10768, name: "War & Politics" },
]

function RandomGenerator() {
  const [randomContent, setRandomContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [contentType, setContentType] = useState("movie")
  const [selectedGenre, setSelectedGenre] = useState("")
  const resultsRef = useRef(null)

  const handleBack = () => {
    // You can customize this behavior - for now it goes back in browser history
    window.history.back()
  }

  const generateRandom = async () => {
    setLoading(true)
    setError(null)

    try {
      const currentYear = new Date().getFullYear()
      const recentYears = [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
        currentYear - 4,
        currentYear - 5,
        currentYear - 6,
      ] // Extended to 7 years
      const randomYear = recentYears[Math.floor(Math.random() * recentYears.length)]

      // Use discover endpoint for better filtering and sorting options
      let apiUrl = `https://api.themoviedb.org/3/discover/${contentType}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`

      const useYearFilter = Math.random() > 0.3 // 70% chance to use year filter
      if (useYearFilter) {
        if (contentType === "movie") {
          apiUrl += `&primary_release_year=${randomYear}`
        } else {
          apiUrl += `&first_air_date_year=${randomYear}`
        }
      }

      const sortOptions = ["popularity.desc", "vote_average.desc", "release_date.desc", "vote_count.desc"]
      const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)]
      apiUrl += `&sort_by=${randomSort}&vote_count.gte=50` // Reduced from 100 to 50

      if (selectedGenre) {
        apiUrl += `&with_genres=${selectedGenre}`
      }

      const randomPage = Math.floor(Math.random() * 10) + 1 // Increased from 5 to 10 pages
      apiUrl += `&page=${randomPage}`

      const response = await axios.get(apiUrl)

      const results = response.data.results
      if (results && results.length > 0) {
        const goodResults = results.filter((item) => item.vote_average >= 5.0) // Reduced from 6.0 to 5.0
        const finalResults = goodResults.length > 0 ? goodResults : results

        const randomIndex = Math.floor(Math.random() * finalResults.length)
        const randomItem = finalResults[randomIndex]

        setRandomContent({
          ...randomItem,
          type: contentType,
        })

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      } else {
        const fallbackUrl = `https://api.themoviedb.org/3/${contentType}/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${Math.floor(Math.random() * 5) + 1}`
        const fallbackResponse = await axios.get(fallbackUrl)

        if (fallbackResponse.data.results && fallbackResponse.data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * fallbackResponse.data.results.length)
          const randomItem = fallbackResponse.data.results[randomIndex]

          setRandomContent({
            ...randomItem,
            type: contentType,
          })

          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 100)
        } else {
          setError("No content found for the selected criteria. Try again!")
        }
      }
    } catch (err) {
      setError("Failed to fetch random content. Please try again.")
      console.error("Error fetching random content:", err)
    } finally {
      setLoading(false)
    }
  }

  const currentGenres = contentType === "movie" ? MOVIE_GENRES : TV_GENRES

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white">Random Movies and Series</h1>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm">
              <option>Category</option>
            </select>
            <select className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm">
              <option>Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Random Discovery
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">Choose your preferences and discover something new!</p>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto shadow-2xl shadow-green-500/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Content Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setContentType("movie")
                      setSelectedGenre("")
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      contentType === "movie"
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                        : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${contentType === "movie" ? "bg-white" : "bg-gray-500"}`}
                    ></div>
                    <span>Movies</span>
                  </button>
                  <button
                    onClick={() => {
                      setContentType("tv")
                      setSelectedGenre("")
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      contentType === "tv"
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                        : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${contentType === "tv" ? "bg-white" : "bg-gray-500"}`}></div>
                    <span>TV Series</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Genre (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 text-white rounded-xl border border-green-500/30 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all backdrop-blur-sm"
                  >
                    <option value="">All Genres</option>
                    {currentGenres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={generateRandom}
              disabled={loading}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-2">
                <svg className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
                </svg>
                <span>
                  {loading ? "Generating..." : `Generate Random ${contentType === "movie" ? "Movie" : "TV Series"}`}
                </span>
              </div>
            </button>
          </div>

          {error && (
            <div className="text-center mb-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-400 max-w-4xl mx-auto">
                {error}
              </div>
            </div>
          )}

          {randomContent && (
            <div
              ref={resultsRef}
              className="bg-black/60 backdrop-blur-2xl border border-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50 max-w-6xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="lg:w-1/3 flex justify-center lg:justify-start">
                  <div className="relative">
                    <img
                      src={
                        randomContent.poster_path
                          ? `https://image.tmdb.org/t/p/w500${randomContent.poster_path}`
                          : "/movie-poster-placeholder.png"
                      }
                      alt={randomContent.title || randomContent.name}
                      className="w-full max-w-sm rounded-xl shadow-2xl shadow-black/80 filter brightness-75 contrast-125"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-3 border border-gray-700/50 shadow-lg">
                      {randomContent.type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                      {randomContent.title || randomContent.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-300 mb-4">
                      <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700/50">
                        ⭐ {randomContent.vote_average?.toFixed(1)}
                      </span>
                      <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700/50">
                        📅 {randomContent.release_date || randomContent.first_air_date}
                      </span>
                    </div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                    <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                      {randomContent.overview || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RandomGenerator
