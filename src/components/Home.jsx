import { useEffect, useState } from 'react'
import Navbar from './Templates/Navbar'
import Topnav from './Templates/Topnav'
import axios from '../utilis/Axios'
import Header from './Header'
import HorizontalCard from './HorizontalCard'
import Loader from './Loader'

function Home() {
  document.title = "Film Orbit"
  const [bgc, setbgc] = useState(null)
  const [Trending, setTrending] = useState([])
  const [Category, setCategory] = useState("all")
  const [page, setPage] = useState(3) // start from page 3 after initial load

  const getsearchbgc = async () => {
    try {  
      const { data } = await axios.get(`/trending/all/day`)
      const filtered = data.results.filter((item) => item.media_type !== "person")
      let randomdata = filtered[Math.floor(Math.random() * filtered.length)]
      setbgc(randomdata)
    } catch(err) {
      console.log(err)
    }
  }

  const getTrending = async () => {
    try {
      // fetch 2 pages together
      const [page1, page2] = await Promise.all([
        axios.get(`/trending/${Category}/day?page=1`),
        axios.get(`/trending/${Category}/day?page=2`),
      ])

      const combined = [...page1.data.results, ...page2.data.results]
      const filtered = combined.filter((item) => item.media_type !== "person")

      setTrending(filtered)
    } catch(err) {
      console.log(err)
    }
  }

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day?page=${page}`)
      const filtered = data.results.filter((item) => item.media_type !== "person")

      setTrending((prev) => [...prev, ...filtered])
      setPage((prev) => prev + 1)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    !bgc && getsearchbgc()
    getTrending()
    setPage(3) // reset page count when category changes
  }, [Category])

  return Trending.length > 0 && bgc ? (
    <>
      <Navbar />
      <div className="w-[80%] h-full overflow-hidden overflow-y-auto">
        <Topnav />
        <Header data={bgc} />
        <HorizontalCard data={Trending} loadMore={loadMore} />
      </div>
    </>
  ) : (
    <Loader />
  )
}

export default Home
