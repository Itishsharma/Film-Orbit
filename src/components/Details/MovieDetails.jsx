"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncloadmovie } from "../actions/Movieactions.jsx";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { removemovie } from "../Redux/Movieslice.jsx";
import Loader from "../Loader"
import HorizontalCard from "../HorizontalCard"
import { auth } from "../../utilis/firebase.js";
import { addToWatchLater, getWatchLater, removeFromWatchLater } from "../../utilis/watchLater.js";


export default function Movie({ data }) {
  const { pathname } = useLocation()
  const { info } = useSelector((state) => state.movie)
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [isInWatchLater, setIsInWatchLater] = useState(false)

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [id])

  // 👇 Check if movie already exists in watch later
  useEffect(() => {
    const checkWatchLater = async () => {
      if (!auth.currentUser) return;
      const list = await getWatchLater(auth.currentUser.uid);
      if (list.some((item) => item.id === info?.detail?.id)) {
        setIsInWatchLater(true);
      } else {
        setIsInWatchLater(false);
      }
    };
    if (info?.detail?.id) checkWatchLater();
  }, [info?.detail?.id]);


  // 👇 Add / Remove movie with auth check
  const handleWatchLater = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to save movies to Watch Later.");
      return;
    }

    const movieItem = {
      id: info.detail.id,
      title: info.detail.title || info.detail.name,
      poster: info.detail.poster_path,
      type: "movie",
    };

  try {

    if (isInWatchLater) {
      await removeFromWatchLater(auth.currentUser.uid, movieItem.id); // ✅ use TMDB id directly
      setIsInWatchLater(false);
      alert("Removed from Watch Later!");
    } else {
      await addToWatchLater(auth.currentUser.uid, movieItem);
      setIsInWatchLater(true);
      alert("Added to Watch Later!");
    }
  } catch (error) {
    console.error("Error updating Watch Later:", error);
    alert("An error occurred while updating Watch Later.");
  }
};


  return info ? (
    <div className="min-h-screen bg-black text-white w-full">
      <div
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,0,60,0.8) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative min-h-screen w-full"
      >
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-500/20 w-full">
          <div className="flex items-center px-6 py-4 w-full">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20 hover:bg-purple-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <i className="ri-arrow-left-line text-xl text-purple-300 group-hover:text-white transition-colors"></i>
            </button>
          </div>
        </nav>

        <div className="w-full px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-start w-full">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <img
                    className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl shadow-purple-900/50 transition-transform duration-500 group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path}`}
                    alt="Movie Poster"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                    {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-purple-300 font-light">
                      ({info.detail.release_date.split("-")[0]})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 shadow-lg shadow-purple-500/50">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {(info.detail.vote_average * 10).toFixed()}
                          <sup className="text-xs">%</sup>
                        </span>
                      </div>
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur animate-pulse"></div>
                  </div>

                  <div className="text-purple-200 font-medium">User Score</div>

                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {info.detail.release_date}
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {info.detail.genres.map((g) => g.name).join(", ")}
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {info.detail.runtime} min
                    </span>
                  </div>
                </div>

                {info.detail.tagline && (
                  <p className="text-xl italic text-purple-200 font-light border-l-4 border-purple-500 pl-4">
                    "{info.detail.tagline}"
                  </p>
                )}

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">Overview</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {info.detail.overview.slice(0, 300)}...
                    <Link className="text-purple-400 hover:text-purple-300 transition-colors ml-2 underline">
                      Read more
                    </Link>
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {info.translations.slice(0, 5).map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-900/40 text-purple-200 rounded-full text-sm border border-purple-500/30"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-3"
                    to={`${pathname}/trailer`}
                  >
                    <i className="ri-play-fill text-xl"></i>
                    Play Trailer
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 rounded-xl font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-3"
                    to={`${pathname}/providers/movie`}
                  >
                    <i className="ri-tv-line text-xl"></i>
                    Watch Live
                  </Link>

                  {/* 👇 Toggle Watch Later button */}
                  <button
                    onClick={handleWatchLater}
                    className={`group relative px-2 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${isInWatchLater
                        ? "bg-red-600/30 border-2 border-red-500 text-red-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50"
                        : "bg-purple-700/30 border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/50"
                      }`}
                  >
                    <i className={isInWatchLater ? "ri-bookmark-fill text-xl" : "ri-bookmark-line text-xl"}></i>
                    {isInWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-purple-500/20 pt-12">
              <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Recommendations & Similar Movies
              </h2>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 w-full">
                <HorizontalCard data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  ) : (
    <Loader />
  )
}
