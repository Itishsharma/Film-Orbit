"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../../utilis/Axios"
import noimg from "/noimg.jpg"
import { auth } from "../../utilis/firebase"

function Topnav() {
  const [query, setQuery] = useState("")
  const [searches, setSearches] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`)
      setSearches(data.results)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (query.length > 0) {
      getSearch()
    } else {
      setSearches([])
    }
  }, [query])

  return (
    <div className="w-full h-[10vh] bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
      <div className="flex justify-between items-center h-full px-8">
        {/* Search Section */}
        <div className="relative flex-1 max-w-2xl">
          <div
            className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}
          >
            <div className="absolute left-4 z-10">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              placeholder="Search movies, TV shows, people..."
            />

            {query.length > 0 && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 p-1 hover:bg-slate-700 rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 text-slate-400 hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {query.length > 0 && searches.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50">
              {searches.slice(0, 8).map((item, index) => (
                <Link
                  to={`/${item.media_type}/details/${item.id}`}
                  key={index}
                  className="flex items-center p-4 hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-700/30 last:border-b-0"
                >
                  <div className="relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-slate-700">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        item.backdrop_path || item.profile_path || item.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.profile_path || item.poster_path}`
                          : noimg
                      }
                      alt="thumbnail"
                      onError={(e) => {
                        e.target.src = noimg
                      }}
                    />
                  </div>

                  <div className="ml-4 flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {item.name || item.title || item.original_name || item.original_title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 capitalize">
                      {item.media_type === "person" ? "Person" : item.media_type}
                    </p>
                    {item.release_date && (
                      <p className="text-slate-500 text-xs mt-1">{new Date(item.release_date).getFullYear()}</p>
                    )}
                  </div>

                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4 ml-8">
          <Link to="/login">
            <button className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="relative z-10">{auth.currentUser ? "Logout" : "Login"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </Link>

          {auth.currentUser && (
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topnav
