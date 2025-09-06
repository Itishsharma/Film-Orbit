import ReactPlayer from "react-player" 
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Notfound from "./404"

function Trailer() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const Category = pathname.includes("movie") ? "movie" : "tv"
  const trvideo = useSelector((state) => state[Category].info.videos)

  return trvideo ? (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
      <Link
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-[110] text-white hover:text-purple-400 transition-colors duration-200 text-3xl cursor-pointer"
      >
        ←
      </Link>

      <div className="w-full max-w-6xl aspect-video">
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${trvideo.key}`}
          className="rounded-lg overflow-hidden shadow-2xl"
        />
      </div>
    </div>
  ) : (
    <Notfound />
  )
}

export default Trailer
