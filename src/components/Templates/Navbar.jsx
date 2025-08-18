import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className="w-[20%] h-full  border-r-2 border-zinc-800 p-5">
        <h1 className="text-2xl text-white font-bold flex items-center">
          <img src="/src/assets/svg.svg" alt="TV" className="text-[#6556cD] w-9 h-8.5" />
          <span className="ml-2">Movies</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 c gap-3">
          <div className="flex-col flex text-zinc-400">
            <h1 className="text-white font-semibold text-xl mt-5 mb-5">
              New Feeds
            </h1>
            <NavLink
              to="/trending"
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md flex items-center"
            >
              <i classname="ri-fire-fill  hover:text-orange-500"></i>
              <h1 className="ml-2 text-[1.3vw]">Trending</h1>
            </NavLink>
            <NavLink
              to="/movie"
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md flex items-center"
            >
              <i classname="ri-movie-2-fill hover:text-white"></i>
              <h1 className="ml-2 text-[1.3vw]">Movies</h1>
            </NavLink>
            <NavLink
              to="/tvshows"
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md flex items-center"
            >
              <i classname="ri-fill hover:text-white"></i>
              <h1 className="ml-2 text-[1.3vw]">Tv Shows</h1>
            </NavLink>
            <NavLink
              to="/person"
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md flex items-center"
            >
              <i classname="ri-heart-2-fill hover:text-red-500"></i>
              <h1 className="ml-2 text-[1.3vw]">Person</h1>
            </NavLink>
          </div>
        </nav>

        <hr className="border-zinc-600 mt-5" />
        {/* <nav className="flex flex-col text-zinc-400 c gap-3">
          <div className="flex-col flex text-zinc-400">
            {/* <h1 className="text-white font-semibold text-xl mt-5 mb-5">
              New Feeds
            </h1>
            <NavLink
              to="/About"
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md"
            >
              About
            </NavLink>
            <NavLink
              to={"/Contact"}
              className="hover:bg-[#6556cD] hover:text-white p-3 duration-300 rounded-md"
            >
              Contact
            </NavLink>
          </div> 
        </nav> */}
      </div>
    </>
  );
}

export default Navbar;
