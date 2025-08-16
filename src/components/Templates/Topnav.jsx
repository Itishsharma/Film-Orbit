import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utilis/Axios";
import noimg from "/noimg.jpg";
import { auth } from "../../utilis/firebase";

function Topnabvar() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const getsearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getsearch();
  }, [query]);


 


  return (
    <div className="  w-full pl-10  h-[10vh]  realtive flex justify-between items-center">
      <label form="search">
        <i className=" cursor-pointer ri-search-line text-xl text-zinc-400"></i>
        <input
          id="search"
          onChange={(e) => setquery(e.target.value)}
          value={query}
          type="text"
          className="search  text-zinc-100 w-[60%] mx-10 p-1 rounded-lg  border-none  outline-none  bg-transparent"
          placeholder="search"
        />
      </label>
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="ri-close-fill  cursor-pointer   text-2xl text-zinc-400"
        ></i>
      )}

      <div className="absolute w-[40%] max-h-[60vh]  text-white top-[15%] left-[30%] bg-[#41404094] rounded-md overflow-auto z-20">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" w-[100%] p-5 flex justify-start items-center rounded-sm border-zinc-100 shadow-lg  hover:bg-pink-500  duration-500"
          >
            <img
              className="w-[15vw] h-[15vh] rounded-md object-cover mr-5="
              src={
                s.backdrop_path || s.profile_path || s.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${s.backdrop_path || s.profile_path || s.poster_path}`
                  : noimg
              }
              alt="img"
            />
            <span className="ml-5">
              {s.name || s.title || s.original_name || s.original_title}
            </span> 
          </Link>
        ))}
      </div>
      <div className=" mr-10 text-white flex gap-4   ">
        <Link to="/login" >
          <button  className="hover:bg-[#6556cD] capitalize py-2 px-2 rounded-md ">
            {
              auth.currentUser?
              "logout"
              :
              "login"
            }
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Topnabvar;
