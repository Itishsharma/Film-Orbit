import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../Templates/Topnav";
import Dropdown from "../Dropdown";
import axios from "../../utilis/Axios";
import Card from "../Navbar page/Card";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  document.title="GR | Popular";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const[page,setpage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${Category}/popular?page=${page}`);
      // setPopular(data.results);
      if(data.results.length > 0){
      setPopular((prevstate)=>[...prevstate, ...data.results]);
      setpage(page+1)
      }else{
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if(Popular.length === 0){
      getPopular()
    }
    else{
     setpage(1)
     setPopular([])
     getPopular()
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return Popular.length > 0 ? (
    <div className="w-screen flex flex-col ">
      <div className="w-full px-[2vw]  flex items-center justify-between">
        <h1 className="text-[1vw] text-zinc-400 flex items-center gap-5 ">
          <i
            onClick={() => navigate(-1)}
            className=" text-[2vw] hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          Popular
        </h1>
        <div className="flex items-center w-[70%]">
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        ></Dropdown>
        </div>
      </div>

      <div className="text-white mt-[2vw] bg-zinc-800">
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <Card data={popular} title="popular"/>
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Popular;
