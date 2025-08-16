import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../Templates/Topnav";
import Dropdown from "../Dropdown";
import axios from "../../utilis/Axios";
import Card from "./Card";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title="GR | Popular";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [Trending, setTrending] = useState([]);
  console.log(Trending)
  const[page,setpage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/${duration}?page=${page}`);
      // setTrending(data.results);
      if(data.results.length > 0){
      setTrending((prevstate)=>[...prevstate, ...data.results]);
      setpage(page+1)
      }else{
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if(Trending.length === 0){
      getTrending()
    }
    else{
     setpage(1)
     setTrending([])
     getTrending()
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [duration, Category]);

  return Trending.length > 0 ? (
    <div className="w-screen flex flex-col ">
      <div className=" w-full py-[10px] px-[10vw]  flex items-center justify-between">
        <h1 className="text-[1vw] text-zinc-400 flex items-center gap-5 ">
          <i
            onClick={() => navigate(-1)}
            className=" text-[2vw] hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          Trending {" "} {Category}
        </h1>
        <div className="flex items-center w-[70%]">
        <Topnav/>
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        ></Dropdown>
        <div className="w-[2%] "></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        ></Dropdown>
        </div>
      </div>

      <div className="text-white mt-[1vw]  flex justify-center items-center bg-zinc-800">
        <InfiniteScroll
          dataLength={Trending.length}
          next={getTrending}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <Card data={Trending} title={"trending"} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
