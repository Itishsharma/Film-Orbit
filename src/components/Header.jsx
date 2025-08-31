import React from 'react'
import { Link } from 'react-router-dom'

function Header({ data }) {
  return (
    <div className="relative w-full bg-gradient-to-br from-purple-900 via-purple-900 to-purple-900 p-6">
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.2),rgba(0,0,0,.3)),url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path || data.poster_path
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          width: '70vw',
          borderRadius: '10px',
        }}
        className="max-w-screen-lg mx-auto h-[50vh] flex flex-col text-white justify-end items-start p-[2%]"
      >
        {/* Glass Effect Info Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
          {/* Title */}
          <h1 className="text-[2vw] font-bold">
            {data.name || data.title || data.original_title || data.original_name}
          </h1>

          {/* Date + Type */}
          <p className="mt-2 text-sm opacity-80">
            <i className="ri-megaphone-fill"></i> {data.release_date || data.first_air_date}
            <i className="ri-play-circle-fill ml-2"></i> {data.media_type?.toUpperCase()}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Link
              to={`/${data.media_type}/details/${data.id}/trailer`}
              className="bg-[#6556CD] rounded-md font-semibold px-4 py-2 text-sm"
            >
              ▶ Play Trailer
            </Link>
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              className="bg-blue-500 hover:bg-blue-600 rounded-md font-semibold px-4 py-2 text-sm"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
