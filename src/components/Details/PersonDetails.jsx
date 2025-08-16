import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadPerson } from "../actions/Personaction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "../Loader";
import HorizontalCard from "../HorizontalCard";
export default function Person() {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadPerson(id));
    // return () => {
    //   dispatch(removePerson());
    // };
  }, [id]);
  return info ? (
    <div className="w-screen p-[1vw] ">
       <nav className="w-full text-zinc-400 flex gap-10 text-xl px-[5vw] mb-5">
        <Link
          onClick={() => navigate(-1)}
          className=" text-[2vw] hover:text-[#6556CD] cursor-pointer text-zinc-700 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex flex-col">
        {/* part-2 poster */}
        <div className="w-[40%] px-[5vw]">
        <img
          className="w-[20vw]  shadow-md  h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path}`}
          alt="img"
        />
        <hr className="mt-7 mb-5 border-none h-[2px] bg-zinc-700" />
        <div className=" text-zinc-400 flex   gap-x-5 text-xl ">
        <a href={`https://www.facebook.com/${info.externalid.facebook_id}`} target="_blank">
          <i className="ri-facebook-circle-fill"></i>
        </a>
        <a
          href={`https://www.instagram.com/${info.externalid.instagram_id}`}
          target="_blank"
        >
          <i className="ri-instagram-fill"></i>
        </a>
        
        </div>
        </div>
        <h1 className="text-[1.5vw] capitalize text-white font-semibold my-1 mx-[4vw]">
          person info
        </h1>
        <h1 className="text-[1vw] capitalize text-white font-semibold  mx-[4vw]">
          know
        </h1>

        <h1 className="text-[1vw] text-white  mx-[4vw]">
          {info.detail.known_for_department}
        </h1>
        

      </div>


      <div className="w-[80%]">

      </div>
    </div>
  ):<Loader/>
}
