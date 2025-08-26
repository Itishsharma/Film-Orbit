"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "../../utilis/Axios"
import noimg from "/noimg.jpg"
import { auth } from "../../utilis/firebase"

function Topnav() {
  const [query, setQuery] = useState("")
  const [searches, setSearches] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [popularContent, setPopularContent] = useState([])
  const location = useLocation()

  const shouldShowSearchbar =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/trending" ||
    location.pathname.startsWith("/movie") ||
    location.pathname.startsWith("/tv")

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`)
      const filteredResults = data.results.filter((item) => item.media_type === "movie" || item.media_type === "tv")
      setSearches(filteredResults)
    } catch (err) {
      console.log(err)
    }
  }

  const getPopularContent = async () => {
    try {
      const [moviesResponse, tvResponse] = await Promise.all([axios.get("/movie/popular"), axios.get("/tv/popular")])

      const movies = moviesResponse.data.results.slice(0, 4).map((item) => ({
        ...item,
        media_type: "movie",
      }))
      const tvShows = tvResponse.data.results.slice(0, 4).map((item) => ({
        ...item,
        media_type: "tv",
      }))

      setPopularContent([...movies, ...tvShows])
    } catch (err) {
      console.log(err)
    }
  }

  const handleAuthAction = () => {
    if (auth.currentUser) {
      auth.signOut()
     } else {
      window.location.href = "/login"
    }
  }

  useEffect(() => {
    if (query.length > 0) {
      getSearch()
    } else {
      setSearches([])
    }
  }, [query])

  useEffect(() => {
    getPopularContent()
  }, [])

  return (
    <div className="w-full h-[10vh] bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-purple-900/30 shadow-lg">
      <div className="flex justify-between items-center h-full px-8">
        {shouldShowSearchbar && (
          <div className="relative flex-1 max-w-2xl">
            <div
              className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}
            >
              <div className="absolute left-4 z-10">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                id="search"
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                value={query}
                type="text"
                autoComplete="off"
                className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-purple-900/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                placeholder="Search movies and TV shows..."
              />

              {query.length > 0 && (
                <button
                  onClick={() => {
                    setQuery("")
                    setSearches([])
                    setIsSearchFocused(false)
                  }}
                  className="absolute right-4 p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-purple-900/50 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50">
                {query.length === 0 ? (
                  <>
                    <div className="p-4 border-b border-purple-900/30 flex justify-between items-center">
                      <h3 className="text-white font-medium text-sm">Popular Movies & TV Shows</h3>
                      <button
                        onClick={() => setIsSearchFocused(false)}
                        className="p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {popularContent.slice(0, 8).map((item, index) => (
                      <Link
                        to={`/${item.media_type}/details/${item.id}`}
                        key={index}
                        className="flex items-center p-4 hover:bg-gray-800/50 transition-colors duration-200 border-b border-purple-900/30 last:border-b-0"
                        onClick={() => {
                          setQuery("")
                          setSearches([])
                          setIsSearchFocused(false)
                        }}
                      >
                        <div className="relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-gray-800">
                          <img
                            className="w-full h-full object-cover"
                            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : noimg}
                            alt="thumbnail"
                          />
                        </div>

                        <div className="ml-4 flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">
                            {item.name || item.title || item.original_name || item.original_title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1 capitalize">
                            {item.media_type === "movie" ? "Movie" : "TV Show"}
                          </p>
                          {(item.release_date || item.first_air_date) && (
                            <p className="text-gray-500 text-xs mt-1">
                              {new Date(item.release_date || item.first_air_date).getFullYear()}
                            </p>
                          )}
                        </div>

                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : searches.length > 0 ? (
                  searches.slice(0, 8).map((item, index) => (
                    <Link
                      to={`/${item.media_type}/details/${item.id}`}
                      key={index}
                      className="flex items-center p-4 hover:bg-gray-800/50 transition-colors duration-200 border-b border-purple-900/30 last:border-b-0"
                      onClick={() => {
                        setQuery("")
                        setSearches([])
                        setIsSearchFocused(false)
                      }}
                    >
                      <div className="relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-gray-800">
                        <img
                          className="w-full h-full object-cover"
                          src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : noimg}
                          alt="thumbnail"
                        />
                      </div>

                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {item.name || item.title || item.original_name || item.original_title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 capitalize">
                          {item.media_type === "movie" ? "Movie" : "TV Show"}
                        </p>
                        {(item.release_date || item.first_air_date) && (
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(item.release_date || item.first_air_date).getFullYear()}
                          </p>
                        )}
                      </div>

                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400">No movies or TV shows found</div>
                )}
              </div>
            )}
          </div>
        )}
        <div className={`flex items-center space-x-4 ${shouldShowSearchbar ? "ml-8" : "ml-auto"}`}>
          <button
            onClick={handleAuthAction}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">{auth.currentUser ? "Logout" : "Login"}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-300 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topnav
