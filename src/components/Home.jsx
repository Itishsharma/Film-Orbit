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
  const [Trending, setTrending] = useState(null)
  const [Category, setCategory] = useState("all")

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
      const { data } = await axios.get(`/trending/${Category}/day`)
      const filtered = data.results.filter((item) => item.media_type !== "person")
      setTrending(filtered)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    !bgc && getsearchbgc()
    getTrending()
  }, [Category])
  
  return Trending && bgc ? (
    <>
      <Navbar />
      <div className="w-[80%] h-full overflow-hidden overflow-y-auto">
        <Topnav />
        <Header data={bgc} />
        <HorizontalCard data={Trending} />
      </div>
    </>
  ) : (
    <Loader />
  )
}

export default Home
