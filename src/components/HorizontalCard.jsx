import React from "react";
import { Link } from "react-router-dom";
function HorizontalCard({ data}) {
  return (
    <div className="w-[100%] h-[40vh]  mt-[5vw] ml-5 text-white flex gap-10 overflow-x-auto overflow-hidden">
      {data.length > 0 ? (
        data.map((item, i) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            key={i}
            className="min-w-[25%] overflow-y-auto bg-[#d9d4d418] rounded-md"
          >
            <img
              className="w-[30vw] h-[20vh] object-cover"
              src={item.backdrop_path || item.poster_path || item.profile_path ?`https://image.tmdb.org/t/p/original${ item.backdrop_path || item.profile_path || item.poster_path} `:(<h1>Sorry noimg</h1>)}
              alt="img"
            />
            <h1 className="ml-2 text-[1.5vw]  font-medium">
              {item.name ||
                item.title ||
                item.original_name ||
                item.original_title}
            </h1>
            <p className="mt-3 mb-3 ml-3 leading-tight tracking-tight ">
              {item.overview.slice(0, 50)}...
              <Link className=" text-blue-500">more</Link>
            </p>
          </Link>
        ))
      ) : (
        <h1 className="w-full flex justify-center items-center text-[4vw]  text-zinc-200 ">
          Nothing's here
        </h1>
      )}
    </div>
  );
}
export default HorizontalCard;
