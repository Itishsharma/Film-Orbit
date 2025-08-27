import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../Templates/Topnav";
import axios from "../../utilis/Axios";
import Card from "../Navbar page/Card";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  document.title="People";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const[page,setpage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${Category}?page=${page}`);
      // setpeople(data.results);
      if(data.results.length > 0){
      setpeople((prevstate)=>[...prevstate, ...data.results]);
      setpage(page+1)
      }else{
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = () => {
    if(people.length === 0){
      getpeople()
    }
    else{
     setpage(1)
     setpeople([])
     getpeople()
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [Category]);

  return people.length > 0 ? (
    <div className="w-screen flex flex-col ">
      <div className="w-full px-[2vw]  flex items-center justify-between">
        <h1 className="text-[1.5vw] text-zinc-400 flex items-center justify-center gap-5 ">
          <i
            onClick={() => navigate(-1)} 
            className=" text-[2vw] hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>{" "}
          People
        </h1>
        <div className="flex items-center w-[70%]">
        <Topnav />
        </div>
      </div>

      <div className="text-white mt-[1vw] flex justify-start bg-zinc-800">
        <InfiniteScroll
          dataLength={people.length}
          next={getpeople}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <Card data={people} title="person" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default People;
