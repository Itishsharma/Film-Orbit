import { useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom"
import Dropdown from "../Dropdown"
import axios from "../../utilis/Axios"
import Card from "../Navbar page/Card"
import Loader from "../Loader"

function Movie() {
  document.title = "Movies"
  const navigate = useNavigate()
  const [Category, setCategory] = useState("now_playing")
  const [Movie, setMovie] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${Category}?page=${page}`)
      if (data.results.length > 0) {
        setMovie((prevstate) => [...prevstate, ...data.results])
        setpage(page + 1)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const refreshHandler = () => {
    if (Movie.length === 0) {
      getMovie()
    } else {
      setpage(1)
      setMovie([])
      getMovie()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [Category])

  return Movie.length > 0 ? (
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
            Movies <span className="text-lg text-purple-400 capitalize">{Category.replace("_", " ")}</span>
          </h1>
        </div>
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="px-8 py-6">
        <Card data={Movie} title="movie" />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Movie
