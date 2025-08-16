import React from "react";
import { Link } from "react-router-dom";

function Card({ data, title }) {
    return (
    <div className="card w-full h-full flex justify-center items-center gap-10 flex-wrap  p-5">
      {data.map((item, i) => (
        <Link to={`/${item.media_type || title}/details/${item.id}`} key={i} className="relative  link w-[30vw] shadow-md ">
            <img
              className="w-[30vw] h-[55vh] object-cover  object-center"
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path || item.poster_path}`}
              alt="img"
            />
            <h1 className="ml-2 mb-3 mt-2 text-[1.5vw]  font-medium">
              { 
              item.name ||
              item.title ||
              item.original_name ||
              item.original_title
              }
            </h1>


            {item.vote_average && 
              <div className=" absolute text-[15px] right-[-5%] bottom-[25%] bg-yellow-600 text-white rounded-full w-[50px] h-[50px] flex justify-center items-center font-semibold"> {(item.vote_average*10).toFixed()} <sup>%</sup></div>
            }
        </Link>
      ))}
    </div>
  );
}

export default Card;
