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

function posterUrl(path, size = "w185") {
  if (!path) return `/placeholder.svg?height=278&width=185&query=poster`
  return `${TMDB_IMAGE_BASE}${size}${path}`
}

function Rating({ value, count }) {
  const display = value ? value.toFixed(1) : "–"
  return (
    <div className="flex items-center gap-1 text-sm text-foreground/90">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 
        00.95.69h3.462c.969 0 1.371 1.24.588 
        1.81l-2.802 2.036a1 1 0 
        00-.364 1.118l1.07 3.292c.3.921-.755 
        1.688-1.54 1.118l-2.802-2.036a1 1 0 
        00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
        1 0 00-.364-1.118L2.88 8.719c-.783-.57-.38-1.81.588-1.81H6.93a1 
        1 0 00.95-.69l1.07-3.292z" />
      </svg>
      <span className="font-medium">{display}</span>
      <span className="text-muted-foreground">({Intl.NumberFormat().format(count)})</span>
    </div>
  )
}

function Badge({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-sm transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
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
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition hover:shadow-sm"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={posterUrl(item.poster_path, "w185")}
          alt={`Poster for ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="line-clamp-2 text-sm font-medium leading-tight">{item.title}</div>
        <div className="flex items-center justify-between">
          <Rating value={item.vote_average} count={item.vote_count} />
          <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground uppercase tracking-wide">
            {item.media_type}
          </span>
        </div>
      </div>
    </a>
  )
}

export default function MustWatchVault() {
  const [items, setItems] = useState([])
  const [type, setType] = useState("all")
  const [error, setError] = useState(null)

  useEffect(() => {
    getMustWatch(type, 36)
      .then(setItems)
      .catch((e) => setError(e.message))
  }, [type])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-2">
        <h1 className="text-pretty text-2xl font-semibold md:text-3xl">Top Rated Vault</h1>
        <p className="text-pretty text-sm text-muted-foreground md:text-base">
          The highest rated movies and TV shows of all time. Data live from TMDB.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge active={type === "all"} onClick={() => setType("all")}>All</Badge>
        <Badge active={type === "movie"} onClick={() => setType("movie")}>Movies</Badge>
        <Badge active={type === "tv"} onClick={() => setType("tv")}>TV</Badge>
      </div>

      {error ? (
        <div role="alert" className="rounded-md border border-red-400 bg-red-100 p-4 text-sm text-red-700">
          <p className="font-medium">Problem loading titles</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : (
        <section>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((item) => (
              <li key={`${item.media_type}-${item.id}`}>
                <Card item={item} />
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-muted-foreground">
            Showing the highest rated movies and TV series. Data © TMDB.
          </p>
        </section>
      )}
    </main>
  )
}
