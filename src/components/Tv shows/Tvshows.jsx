"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Dropdown from "../Dropdown"
import axios from "../../utilis/Axios"
import Card from "../Navbar page/Card"
import Loader from "../Loader"

function TVshows() {
  document.title = "GR | TvShows"
  const navigate = useNavigate()
  const [Category, setCategory] = useState("airing_today")
  const [TVshows, setTVshows] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getTVshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${Category}?page=${page}`)
      if (data.results.length > 0) {
        setTVshows((prevstate) => [...prevstate, ...data.results])
        setpage(page + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log("tvshows", err)
    }
  }

  const refreshHandler = () => {
    if (TVshows.length === 0) {
      getTVshows()
    } else {
      setpage(1)
      setTVshows([])
      getTVshows()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [Category])

  return TVshows.length > 0 ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-x-hidden">
      <div className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border-b border-purple-900/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white">
            TV Shows <span className="text-lg text-purple-400 capitalize">{Category.replace("_", " ")}</span>
          </h1>
        </div>
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "on_the_air", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="px-8 py-6">
        <Card data={TVshows} title="tv" />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default TVshows
