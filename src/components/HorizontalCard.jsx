import { Link } from "react-router-dom"

function HorizontalCard({ data }) {
  return (
    <div className="w-full px-6 py-8">
      <div className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4">
        {data.length > 0 ? (
          data.map((item, i) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={i}
              className="group min-w-[280px] max-w-[280px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-slate-700/50"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                {item.backdrop_path || item.poster_path || item.profile_path ? (
                  <>
                    <img
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      src={`https://image.tmdb.org/t/p/original${
                        item.backdrop_path || item.profile_path || item.poster_path
                      }`}
                      alt={item.name || item.title || "Movie poster"}
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {item.name || item.title || item.original_name || item.original_title}
                </h3>

                {/* Description */}
                {item.overview && (
                  <div className="space-y-2">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {item.overview.slice(0, 100)}
                      {item.overview.length > 100 && "..."}
                    </p>

                    {item.overview.length > 100 && (
                      <span className="inline-flex items-center text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors duration-200">
                        Read more
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                )}

                {/* Rating or additional info */}
                {item.vote_average && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-slate-300 text-sm ml-1">{item.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-slate-800/50 rounded-full p-6 mb-4">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-slate-300 text-xl font-medium mb-2">No content available</h3>
            <p className="text-slate-400 text-sm">Check back later for new updates</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HorizontalCard
