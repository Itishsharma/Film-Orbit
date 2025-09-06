import { useSelector } from "react-redux" 
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Notfound from "./404"

function WatchLive() {
  const APIKEY = import.meta.env.VITE_API_KEY
  const { id } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const Category = pathname.includes("movie") ? "movie" : "tv"

  const mediaInfo = useSelector((state) => state[Category]?.info)

  const shouldShowPlayer = true

  return shouldShowPlayer ? (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-[1] fixed top-0 z-[100] left-0 w-full h-screen flex items-center justify-center overflow-hidden">
      <Link
        onClick={() => navigate(-1)}
        className="text-3xl hover:text-gray-300 cursor-pointer absolute top-6 left-6 text-white ri-arrow-left-line transition-colors duration-300 z-10"
      ></Link>

      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        <div className="relative">
          <div className="w-28 h-28 mx-auto bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            <svg className="w-14 h-14 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full border-4 border-gray-500 animate-ping opacity-40"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white animate-fade-in tracking-wide">Watch Live</h1>
          <div className="text-3xl font-semibold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent animate-pulse">
            Coming Soon
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm mx-auto">
            We're crafting an incredible streaming experience just for you. Something amazing is on the way!
          </p>
        </div>

        <div className="flex justify-center space-x-3">
          <div className="w-4 h-4 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gray-500 rounded-full animate-ping opacity-50"></div>
        <div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-gray-400 rounded-full animate-ping opacity-30"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-gray-600 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-20"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
    </div>
  ) : (
    <Notfound />
  )
}

export default WatchLive
