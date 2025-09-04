"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncloadmovie } from "../actions/Tvactions.jsx"
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { removemovie } from "../Redux/Tvslice.jsx"
import Loader from "../Loader"
import HorizontalCard from "../HorizontalCard"
import { auth } from "../../utilis/firebase"
import { addToWatchLater, getWatchLater, removeFromWatchLater } from "../../utilis/watchLater";


function TvDetails() {
  const { pathname } = useLocation()
  const { info } = useSelector((state) => state.tv)
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [isInWatchLater, setIsInWatchLater] = useState(false);

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [id])

  // 👇 Check if tv show already exists in watch later
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


// 👇 Add / Remove tv show with auth check
const handleWatchLater = async () => {
  if (!auth.currentUser) {
    alert("You must be logged in to save TV shows to Watch Later.");
    return;
  }

  const tvItem = {
    id: info.detail.id,
    title: info.detail.name || info.detail.title,
    poster: info.detail.poster_path,
    type: "tv",
  };

  try {
    if (isInWatchLater) {
      await removeFromWatchLater(auth.currentUser.uid, tvItem.id); // ✅ use TMDB id directly
      setIsInWatchLater(false);
      alert("Removed from Watch Later!");
    } else {
      await addToWatchLater(auth.currentUser.uid, tvItem);
      setIsInWatchLater(true);
      alert("Added to Watch Later!");
    }
  } catch (error) {
    console.error("Error updating Watch Later:", error);
    alert("An error occurred while updating Watch Later.");
  }
};



  return info ? (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      <div
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,0,60,0.8) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative min-h-screen w-full"
      >
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-500/20 w-full">
          <div className="flex items-center px-6 py-4 w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 border border-purple-500/30"
              >
                <i className="ri-arrow-left-line text-2xl text-purple-300 group-hover:text-white transition-colors"></i>
              </button>
              <div className="text-white">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  {info.detail.name || info.detail.title || "TV Show"}
                </h2>
                <p className="text-sm text-purple-300">TV Series Details</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="w-full px-6 py-12 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start w-full">
              {/* Poster */}
              <div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
                <div className="relative group">
                  <img
                    className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl shadow-purple-900/50 transition-transform duration-500 group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path}`}
                    alt="TV Show Poster"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                    {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-purple-300 font-light">
                      ({info.detail.first_air_date.split("-")[0]})
                    </span>
                  </div>
                </div>

                {/* Score & Genres */}
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
                      {info.detail.first_air_date}
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {info.detail.genres.map((g) => g.name).join(", ")}
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {info.detail.runtime} min
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                {info.detail.tagline && (
                  <p className="text-xl italic text-purple-200 font-light border-l-4 border-purple-500 pl-4">
                    "{info.detail.tagline}"
                  </p>
                )}

                {/* Overview */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">Overview</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {info.detail.overview.slice(0, 300)}...
                    <Link className="text-purple-400 hover:text-purple-300 transition-colors ml-2 underline">
                      Read more
                    </Link>
                  </p>
                </div>

                {/* Languages */}
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

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-3"
                    to={`${pathname}/trailer`}
                  >
                    <i className="ri-play-fill text-xl"></i>
                    Play Trailer
                  </Link>

                  <Link
                    className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 rounded-xl font-semibold text-purple-300 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-3"
                    to={`${pathname}/providers/tv`}
                  >
                    <i className="ri-tv-line text-xl"></i>
                    Watch Live
                  </Link>

                  {/* ✅ Watch Later Button */}
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

        {/* Seasons */}
        <div className="w-full px-6 py-12 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-purple-500/20 pt-12">
              <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Seasons
              </h2>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
                  {info.detail.seasons.length > 0 ? (
                    info.detail.seasons.map((item, i) => (
                      <div key={i} className="flex-shrink-0 group">
                        <div className="relative">
                          <img
                            className="w-64 h-80 object-cover rounded-xl shadow-lg shadow-purple-900/30 transition-transform duration-300 group-hover:scale-105"
                            src={`https://image.tmdb.org/t/p/original${item.backdrop_path || item.profile_path || item.poster_path}`}
                            alt="Season Poster"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="mt-4 text-lg text-white font-medium text-center max-w-64">
                          {item.name || item.title || item.original_name || item.original_title}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <div className="w-full flex justify-center items-center py-20">
                      <h3 className="text-3xl text-purple-300 font-light">No Seasons Available</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="w-full px-6 py-12 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-purple-500/20 pt-12">
              <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Recommendations & Similar Shows
              </h2>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 w-full overflow-hidden">
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

export default TvDetails
