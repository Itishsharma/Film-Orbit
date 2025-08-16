import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../Templates/Topnav";
import Dropdown from "../Dropdown";
import axios from "../../utilis/Axios";
import Card from "../Navbar page/Card";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function Movie() {
  document.title="GR | Movie";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("now_playing");
  const [Movie, setMovie] = useState([]);
  const[page,setpage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${Category}?page=${page}`);
      // setMovie(data.results);
      if(data.results.length > 0){
      setMovie((prevstate)=>[...prevstate, ...data.results]);
      setpage(page+1)
      }else{
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if(Movie.length === 0){
      getMovie()
    }
    else{
     setpage(1)
     setMovie([])
     getMovie()
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return Movie.length > 0 ? (
    <div className="w-screen flex flex-col ">
      <div className="w-full px-[2vw]  flex items-center justify-between">
        <h1 className="text-[2vw] text-zinc-400 flex items-center justify-center gap-5 ">
          <i
            onClick={() => navigate(-1)} 
            className=" text-[2vw] hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          Movie <span className="text-[1vw]">{Category}</span>
        </h1>
        <div className="flex items-center w-[70%]">
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular","top_rated","upcoming","now_playing"]}
          func={(e) => setCategory(e.target.value)}
        ></Dropdown>
        </div>
      </div>

      <div className="text-white mt-[2vw] bg-zinc-800">
        <InfiniteScroll
          dataLength={Movie.length}
          next={getMovie}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <Card data={Movie} title="movie"/>
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Movie;
