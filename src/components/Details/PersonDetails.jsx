"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Mock data for demonstration - replace with your actual API calls
const mockPersonData = {
  1: {
    id: 1,
    name: "Peter Stormare",
    profile_path: "/peter-stormare-actor-portrait.png",
    biography:
      "Peter Stormare is a Swedish actor, musician, playwright, and theatre director. He is known for his work as Gaear Grimsrud in Fargo and John Abruzzi in Prison Break.",
    birthday: "1953-08-27",
    place_of_birth: "Arbrå, Gävleborgs län, Sweden",
    known_for_department: "Acting",
    popularity: 15.2,
    external_ids: {
      facebook_id: "peterstormare",
      instagram_id: "peterstormare",
      twitter_id: "peterstormare",
    },
    movie_credits: [
      { id: 1, title: "Fargo", year: "1996", character: "Gaear Grimsrud", poster_path: "/fargo-movie-poster.png" },
      {
        id: 2,
        title: "The Big Lebowski",
        year: "1998",
        character: "Nihilist",
        poster_path: "/big-lebowski-movie-poster.png",
      },
      { id: 3, title: "Constantine", year: "2005", character: "Lucifer", poster_path: "/constantine-movie-poster.png" },
    ],
    tv_credits: [
      {
        id: 1,
        name: "Prison Break",
        year: "2005-2009",
        character: "John Abruzzi",
        poster_path: "/prison-break-tv-show-poster.png",
      },
      {
        id: 2,
        name: "American Gods",
        year: "2017-2021",
        character: "Czernobog",
        poster_path: "/american-gods-tv-show-poster.png",
      },
    ],
  },
}

export default function PersonDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [person, setPerson] = useState(mockPersonData[1]) // Using mock data

  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Person Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-white">
              <img
                src={person.profile_path || "/placeholder.svg"}
                alt={person.name}
                className="w-full rounded-lg shadow-2xl mb-6"
              />

              <h2 className="text-2xl font-bold mb-4">{person.name}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-purple-300">📅</span>
                  <span className="text-sm">Born: {person.birthday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-300">📍</span>
                  <span className="text-sm">{person.place_of_birth}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-300">⭐</span>
                  <span className="text-sm">Popularity: {person.popularity}</span>
                </div>
              </div>

              <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                {person.known_for_department}
              </span>

              {/* Social Links */}
              <div className="flex gap-4">
                {person.external_ids.facebook_id && (
                  <a
                    href={`https://facebook.com/${person.external_ids.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white/10 bg-transparent rounded-lg text-sm transition-colors"
                  >
                    <span>🔗</span>
                    Facebook
                  </a>
                )}
                {person.external_ids.instagram_id && (
                  <a
                    href={`https://instagram.com/${person.external_ids.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white/10 bg-transparent rounded-lg text-sm transition-colors"
                  >
                    <span>🔗</span>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Biography and Filmography */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg text-white">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold">Biography</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">{person.biography}</p>
              </div>
            </div>

            {/* Movie Credits */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg text-white">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold">Known For (Movies)</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {person.movie_credits.map((movie) => (
                    <div key={movie.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg bg-black/20 border border-white/10">
                        <img
                          src={movie.poster_path || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-semibold text-sm mb-1">{movie.title}</h4>
                          <p className="text-gray-300 text-xs">{movie.year}</p>
                          <p className="text-purple-300 text-xs">{movie.character}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TV Credits */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg text-white">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold">Television</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {person.tv_credits.map((show) => (
                    <div key={show.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg bg-black/20 border border-white/10">
                        <img
                          src={show.poster_path || "/placeholder.svg"}
                          alt={show.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-semibold text-sm mb-1">{show.name}</h4>
                          <p className="text-gray-300 text-xs">{show.year}</p>
                          <p className="text-purple-300 text-xs">{show.character}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
