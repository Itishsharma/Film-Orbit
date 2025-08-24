"use client"
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="w-[20%] h-full bg-gradient-to-b from-black via-gray-900 to-black backdrop-blur-xl border-r border-purple-900/30 p-6 shadow-2xl">
      {/* Logo Section */}
      <div className="mb-8">
        <h1 className="text-2xl text-white font-bold flex items-center group">
          <div className="mr-3">
            <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
          </div>
          <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
            Film Orbit
          </span>
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="space-y-2">
        <div className="mb-6">
          <h2 className="text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4 px-3">Discover</h2>

          <div className="space-y-1">
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                }`
              }
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 mr-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                </svg>
              </div>
              <span className="font-medium">Trending</span>
            </NavLink>

            <NavLink
              to="/movie"
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                }`
              }
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="font-medium">Movies</span>
            </NavLink>

            <NavLink
              to="/tvshows"
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                }`
              }
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 mr-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 19H3V5h18v14zM16 10.5l-6 4.5V6z" />
                </svg>
              </div>
              <span className="font-medium">TV Shows</span>
            </NavLink>

            <NavLink
              to="/person"
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                }`
              }
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 mr-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="font-medium">People</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-800 to-transparent"></div>

      {/* Footer */}
      <div className="mt-auto pt-6">
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl p-4 border border-purple-900/30">
          <p className="text-xs text-gray-400 text-center">Discover amazing movies and TV shows</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
