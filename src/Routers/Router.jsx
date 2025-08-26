import Home from "../components/Home"
import { Route, Routes } from "react-router-dom"
import Trending from "../components/Navbar page/Trending"
import Popular from "../components/Popular/Popular"
import Movies from "../components/Movie/Movies"
import TVshows from "../components/Tv shows/Tvshows"
import People from "../components/People/People"
import PersonDetails from "../components/Details/PersonDetails"
import MovieDetails from "../components/Details/MovieDetails"
import TvDetails from "../components/Details/TvDetails"
import Trailer from "../components/Trailer"
import Notfound from "../components/404"
import Logout from "../components/Logout/logout"
import Login from "../components/LogIn/Login"
import Signup from "../components/Signup/Signup"
import WatchLive from "../components/WatchLive"
import RandomGenerator from "../components/Random/RandomGenerator"
function Link() {
  return (
    <div className=" bg-zinc-800  w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tvshows" element={<TVshows />} />
        <Route path="/person" element={<People />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          <Route path="/movie/details/:id/providers/movie" element={<WatchLive />} />
        </Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          <Route path="/tv/details/:id/providers/tv" element={<WatchLive />} />
        </Route>
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<Notfound />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/random" element={<RandomGenerator />} />
      </Routes>
    </div>
  )
}

export default Link
