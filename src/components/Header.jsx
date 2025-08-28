import React from 'react'
import { Link } from 'react-router-dom'
function Header({data}) {
  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900 to-purple-900 p-6">
    <div
    style={{
        background:`linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.2),rgba(0,0,0,.3)),url(https://image.tmdb.org/t/p/original/${ data.backdrop_path || data.profile_path|| data.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition:'top',
        backgroundRepeat:"no-repeat",
        width:"70vw",
        borderRadius:"10px"
    }}
     className=' max-w-screen-lg mx-auto h-[50vh] flex flex-col text-white justify-end items-start p-[2%]  '>
        <h1 className='text-[2vw] font-bold'>
            {
                data.name || data.title || data.original_title || data.original_naem
            }
        </h1>
        <p className='w-[50vw] text-[1.5vw]'>{data.overview.slice(0,200)}... <Link to={`/${data.media_type}/details/${data.id}`} className=" text-blue-500">more</Link></p>

        <p className='mt-2'>
        <i className=" ri-megaphone-fill"></i> {data.release_date || data.first_air_date}
        <i className="ri-play-circle-fill ml-2"></i>{data.media_type.toUpperCase()}
        </p>

        <Link  to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-[#6556CD] rounded-md font-semibold mt-5 p-2'>Watch Trailer</Link>
    </div>
    </div>
  )
}

export default Header