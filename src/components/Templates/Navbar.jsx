"use client"
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div
      className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-purple-900
      backdrop-blur-xl shadow-2xl transition-all duration-300 flex flex-col
      w-20 lg:w-[20%] p-2 lg:p-6"
    >
      {/* Logo Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center">
          {/* Bigger logo with less margin */}
          <div className="mr-0">
            <div className="w-22 h-22 flex items-center justify-center">
              <img
                src="/src/assets/icon1.png"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Gradient text */}
          <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
            Film Orbit
          </span>
        </h1>
      </div>
 
      {/* Navigation Section */}
      <div className="mb-6">
          <h2 className="text-gray-300 font-semibold text-sm uppercase tracking-[0.2em] mb-4 px-3">
            Discover
          </h2>
        {/* Trending */}
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">Trending</span>
        </NavLink>

        {/* Movies */}
        <NavLink
          to="/movie"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">Movies</span>
        </NavLink>

        {/* TV Shows */}
        <NavLink
          to="/tvshows"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 19H3V5h18v14zM16 10.5l-6 4.5V6z" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">TV Shows</span>
        </NavLink>

        {/* Random Binge */}
        <NavLink
          to="/random"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">Random Binge</span>
        </NavLink>

        {/* Must-Watch Vault */}
        <NavLink
          to="/mustwatch"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-purple-700 to-blue-600 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">Must-Watch Vault</span>
        </NavLink>

        {/* Watch Later */}
        <NavLink
          to="/watchlater"
          className={({ isActive }) =>
            `group flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                : "text-gray-300 hover:text-white hover:bg-gray-900/50"
            }`
          }
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-gray-400 to-purple-500 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
            </svg>
          </div>
          <span className="hidden lg:inline ml-3 font-medium">Watch Later</span>
        </NavLink>
      </div>

      {/* Footer only on lg */}
      <div className="hidden lg:block mt-auto pt-6">
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl p-4 border border-purple-900/30">
          <p className="text-sm text-gray-300 text-center font-[Orbitron] tracking-wider">
            A Universe of Movies and Shows at your Fingertips
          </p>
       </div>
      </div>
    </div>
  )
}

export default Navbar
