import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Navbar from "./components/Navbar"
import Search from "./pages/Search"
import Reviews from "./pages/Reviews"
import Watchlist from "./pages/Watchlist"



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/reviews/:id" element={<Reviews />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>

        </Routes>
      </Routes>
    </>
  )
}

export default App
