// mustwatch.jsx
import React, { useEffect, useState } from "react"

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/"

// ✅ Use Vite environment variables
function getBearerOrApiKey() {
  return {
    bearer: import.meta.env.VITE_TMDB_BEARER,
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
  }
}

function buildUrl(path, params) {
  const { apiKey, bearer } = getBearerOrApiKey()
  const u = new URL(`https://api.themoviedb.org/3${path}`)
  if (!bearer && apiKey) u.searchParams.set("api_key", apiKey)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) u.searchParams.set(k, String(v))
    }
  }
  return u.toString()
}

async function tmdbFetch(path, params) {
  const { bearer, apiKey } = getBearerOrApiKey()
  if (!bearer && !apiKey) {
    throw new Error("Missing TMDB credentials. Set VITE_TMDB_BEARER (v4 token) or VITE_TMDB_API_KEY (v3).")
  }

  const url = buildUrl(path, params)
  const res = await fetch(url, {
    headers: bearer
      ? {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json;charset=utf-8",
        }
      : {},
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText} — ${text}`)
  }
  return await res.json()
}

function toUnifiedMovie(item) {
  return {
    id: item.id,
    media_type: "movie",
    title: item.title ?? "Untitled",
    year: item.release_date ? item.release_date.slice(0, 4) : undefined,
    poster_path: item.poster_path ?? null,
    vote_average: item.vote_average ?? 0,
    vote_count: item.vote_count ?? 0,
    overview: item.overview ?? "",
  }
}

function toUnifiedTV(item) {
  return {
    id: item.id,
    media_type: "tv",
    title: item.name ?? "Untitled",
    year: item.first_air_date ? item.first_air_date.slice(0, 4) : undefined,
    poster_path: item.poster_path ?? null,
    vote_average: item.vote_average ?? 0,
    vote_count: item.vote_count ?? 0,
    overview: item.overview ?? "",
  }
}

// ✅ Fetch Top Rated movies/TV
async function getMustWatch(type = "all", limit = 30) {
  const commonParams = { language: "en-US", page: 1 }

  const requests = []
  if (type === "all" || type === "movie") {
    requests.push(tmdbFetch("/movie/top_rated", commonParams))
  }
  if (type === "all" || type === "tv") {
    requests.push(tmdbFetch("/tv/top_rated", commonParams))
  }

  const results = await Promise.all(requests)

  let unified = []
  if (type === "movie") {
    unified = (results[0]?.results || []).map(toUnifiedMovie)
  } else if (type === "tv") {
    unified = (results[0]?.results || []).map(toUnifiedTV)
  } else {
    const movies = (results[0]?.results || []).map(toUnifiedMovie)
    const tv = (results[1]?.results || []).map(toUnifiedTV)
    unified = [...movies, ...tv]
  }

  // sort by rating first, then vote count
  unified.sort((a, b) => {
    if (b.vote_average !== a.vote_average) return b.vote_average - a.vote_average
    return b.vote_count - a.vote_count
  })

  return unified.slice(0, limit)
}

function posterUrl(path, size = "w342") {
  if (!path) return `/placeholder.svg?height=513&width=342&query=poster`
  return `${TMDB_IMAGE_BASE}${size}${path}`
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Rating({ value, count }) {
  const display = value ? value.toFixed(1) : "–"
  const percentage = (value / 10) * 100
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <div className="relative">
          <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.719c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.719c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{display}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        ({new Intl.NumberFormat().format(count)})
      </span>
    </div>
  )
}

function FilterButton({ active, children, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200
        ${active 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105" 
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md"
        }
      `}
      aria-current={active ? "page" : undefined}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  )
}

function Card({ item }) {
  const href = `https://www.themoviedb.org/${item.media_type}/${item.id}`
  const title = item.title + (item.year ? ` (${item.year})` : "")
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Poster */}
        <div className="aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <img
            src={posterUrl(item.poster_path, "w342")}
            alt={`Poster for ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Media type badge */}
          <div className="absolute top-3 right-3">
            <span className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm
              ${item.media_type === 'movie' 
                ? 'bg-red-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
              }
            `}>
              {item.media_type === 'movie' ? '🎬' : '📺'} {item.media_type.toUpperCase()}
            </span>
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
              <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.719c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-white">
                {item.vote_average ? item.vote_average.toFixed(1) : '–'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          
          {item.year && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {item.year}
            </p>
          )}
          
          <Rating value={item.vote_average} count={item.vote_count} />
        </div>
      </div>
    </a>
  )
}

export default function MustWatchVault() {
  const [items, setItems] = useState([])
  const [type, setType] = useState("all")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    getMustWatch(type, 36)
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [type])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            <span className="text-4xl">🏆</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Top Rated Vault
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the highest rated movies and TV shows of all time, curated from millions of reviews worldwide.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live data from TMDB
            </span>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <FilterButton 
            active={type === "all"} 
            onClick={() => setType("all")}
            icon="🎭"
          >
            All Content
          </FilterButton>
          <FilterButton 
            active={type === "movie"} 
            onClick={() => setType("movie")}
            icon="🎬"
          >
            Movies
          </FilterButton>
          <FilterButton 
            active={type === "tv"} 
            onClick={() => setType("tv")}
            icon="📺"
          >
            TV Shows
          </FilterButton>
        </div>

        {/* Content */}
        {error ? (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Unable to Load Content
              </h3>
              <p className="text-red-600 dark:text-red-300 text-sm leading-relaxed">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          <section>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {items.map((item) => (
                <Card key={`${item.media_type}-${item.id}`} item={item} />
              ))}
            </div>

            {items.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Showing {items.length} top-rated {type === 'all' ? 'titles' : type === 'movie' ? 'movies' : 'TV shows'}
                </p>
                <p className="flex items-center gap-2">
                  <span>Powered by</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">TMDB</span>
                  <span>🎬</span>
                </p>
              </div>
            </footer>
          </section>
        )}
      </main>
    </div>
  )
}
