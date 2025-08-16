import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Notfound from "./404";


function WatchLive() {
  const APIKEY = import.meta.env.VITE_API_KEY;
  const { id } =useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const Category = pathname.includes("movie") ? "movie" : "tv";
  const trvideo = useSelector((state) => state[Category].info.videos);
  return trvideo ? (
    <div className="bg-[#0e0d0dd8] opacity-[1] absolute top-0 z-[100] left-0  w-full h-full flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className=" text-[2vw] hover:text-[#6556CD] cursor-pointer absolute top-3 left-5 text-white ri-arrow-left-line"
      ></Link>
      <ReactPlayer controls  width={800} height={500} url={`https://embed.smashystream.com/playere.php`}/>
    </div>
  ):<Notfound/>
}

export default WatchLive;
