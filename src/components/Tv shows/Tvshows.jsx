import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../Templates/Topnav";
import Dropdown from "../Dropdown";
import axios from "../../utilis/Axios";
import Card from "../Navbar page/Card";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function TVshows() {
  document.title="GR | TvShows";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("airing_today");
  const [TVshows, setTVshows] = useState([]);
  const[page,setpage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getTVshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${Category}?page=${page}`);
      // setTVshows(data.results);
      if(data.results.length > 0){
      setTVshows((prevstate)=>[...prevstate, ...data.results]);
      setpage(page+1)
      }else{
        setHasMore(false);
      }
    } catch (err) {
      console.log("tvshows",err);
    }
  };

  const refreshHandler = () => {
    if(TVshows.length === 0){
      getTVshows()
    }
    else{
     setpage(1)
     setTVshows([])
     getTVshows()
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return TVshows.length > 0 ? (
    <div className="w-screen flex flex-col ">
      <div className="w-full px-[2vw]  flex items-center justify-between">
        <h1 className="text-[1vw] text-zinc-400 flex items-center gap-5 ">
          <i
            onClick={() => navigate(-1)}
            className=" text-[2vw] hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          TvShows {Category}
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular","top_rated","on_the_air","airing_today"]}
          func={(e) => setCategory(e.target.value)}
          />
        
        <div className="w-[2%] ">
        </div>
      </div>

      <div className="text-white mt-[2vw] bg-zinc-800">
        <InfiniteScroll
          dataLength={TVshows.length}
          next={getTVshows}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <Card data={TVshows} title="tv" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default TVshows;
