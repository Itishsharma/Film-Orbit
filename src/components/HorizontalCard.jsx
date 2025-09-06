import { Link } from "react-router-dom" 
import { useState, useRef, useEffect } from "react"

function HorizontalCard({ data, title }) {
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [genreMap, setGenreMap] = useState({})

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${
              process.env.REACT_APP_TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8"
            }`,
          ).then((res) => res.json()),
          fetch(
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${
              process.env.REACT_APP_TMDB_API_KEY || "8265bd1679663a7ea12ac168da84d2e8"
            }`,
          ).then((res) => res.json()),
        ])

        const genres = {}
        movieGenres.genres?.forEach((genre) => (genres[genre.id] = genre.name))
        tvGenres.genres?.forEach((genre) => (genres[genre.id] = genre.name))
        setGenreMap(genres)
      } catch (error) {
        console.log("Error fetching genres:", error)
      }
    }

    fetchGenres()
  }, [])

  const getGenres = (item) => {
    if (!item.genre_ids || item.genre_ids.length === 0) return null
    const genres = item.genre_ids
      .slice(0, 2)
      .map((id) => genreMap[id])
      .filter(Boolean)
    return genres.length > 0 ? genres.join(", ") : null
  }

  const getMediaType = (item) => {
    if (title === "movie") return "Movie"
    if (title === "tv") return "TV Series"
    return item.media_type === "tv" ? "TV Series" : "Movie"
  }

  const scroll = (direction) => {
    const container = scrollRef.current
    const scrollAmount = 320 // Width of card + gap

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleScroll = () => {
    const container = scrollRef.current
    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth)
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-purple-900 via-purple-900 to-slate-900 p-6">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide p-5 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.map((item, i) => {
          const mediaType = item.media_type || title || "movie"
          const imageUrl =
            item.poster_path || item.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path}`
              : "https://via.placeholder.com/300x420?text=No+Image"

          return (
            <Link to={`/${mediaType}/details/${item.id}`} key={i} className="relative group flex-shrink-0">
              <div className="relative w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500">
                <img className="w-full h-full object-cover" src={imageUrl} alt="movie poster" />

                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                      {/* Movie/TV title */}
                      <h1 className="text-white text-lg font-bold mb-2 line-clamp-2">
                        {item.name || item.title || item.original_name || item.original_title}
                      </h1>

                      {/* Year */}
                      {(item.release_date || item.first_air_date) && (
                        <p className="text-gray-300 text-sm mb-2">
                          {new Date(item.release_date || item.first_air_date).getFullYear()}
                        </p>
                      )}

                      <p className="text-gray-400 text-xs mb-3">{getGenres(item) || getMediaType(item)}</p>

                      {/* Rating */}
                      {item.vote_average && (
                        <div className="flex items-center">
                          <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1">
                            <span className="text-yellow-400 text-sm font-medium">
                              {(item.vote_average * 10).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-3 text-white hover:bg-black/70 transition-all duration-300 shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-3 text-white hover:bg-black/70 transition-all duration-300 shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default HorizontalCard
