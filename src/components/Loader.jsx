function Loader() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="relative w-40 h-40">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
            <div className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            <div className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div>
            <div className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full right-0 top-1/2 transform -translate-y-1/2 translate-x-2 shadow-[0_0_12px_rgba(99,102,241,0.6)]"></div>
          </div>

          <div
            className="absolute inset-6 border-2 border-purple-400/50 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "8s" }}
          >
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 shadow-[0_0_8px_rgba(253,224,71,0.8)]"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 shadow-[0_0_6px_rgba(255,255,255,0.8)]"></div>
            <div className="absolute w-1 h-1 bg-purple-300 rounded-full left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 shadow-[0_0_6px_rgba(196,181,253,0.8)]"></div>
            <div className="absolute w-2 h-2 bg-pink-300 rounded-full right-0 top-1/2 transform -translate-y-1/2 translate-x-1 shadow-[0_0_8px_rgba(249,168,212,0.8)]"></div>
          </div>

          <div className="absolute inset-8 bg-gradient-to-br from-purple-900 to-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)] border-2 border-purple-500/30">
            {/* Clapperboard base */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
            >
              {/* Clapperboard base */}
              <rect
                x="8"
                y="20"
                width="48"
                height="32"
                rx="4"
                fill="url(#gradient1)"
                stroke="#8b5cf6"
                strokeWidth="2"
              />

              {/* Clapperboard top (clapper) */}
              <rect
                x="8"
                y="12"
                width="48"
                height="12"
                rx="2"
                fill="url(#gradient2)"
                stroke="#a855f7"
                strokeWidth="2"
                transform="rotate(-5 32 18)"
              />

              {/* Black and white stripes on clapper */}
              <rect x="12" y="14" width="6" height="8" fill="#000" transform="rotate(-5 32 18)" />
              <rect x="20" y="14" width="6" height="8" fill="#fff" transform="rotate(-5 32 18)" />
              <rect x="28" y="14" width="6" height="8" fill="#000" transform="rotate(-5 32 18)" />
              <rect x="36" y="14" width="6" height="8" fill="#fff" transform="rotate(-5 32 18)" />
              <rect x="44" y="14" width="6" height="8" fill="#000" transform="rotate(-5 32 18)" />

              {/* Scene and Take text areas */}
              <rect x="12" y="26" width="18" height="8" rx="1" fill="#1f2937" stroke="#6366f1" strokeWidth="1" />
              <rect x="34" y="26" width="18" height="8" rx="1" fill="#1f2937" stroke="#6366f1" strokeWidth="1" />

              {/* Text labels */}
              <text x="21" y="31" textAnchor="middle" fill="#8b5cf6" fontSize="6" fontFamily="Arial">
                SCENE
              </text>
              <text x="43" y="31" textAnchor="middle" fill="#8b5cf6" fontSize="6" fontFamily="Arial">
                TAKE
              </text>

              {/* Film holes */}
              <circle cx="14" cy="40" r="2" fill="#6366f1" />
              <circle cx="50" cy="40" r="2" fill="#6366f1" />
              <circle cx="14" cy="46" r="2" fill="#6366f1" />
              <circle cx="50" cy="46" r="2" fill="#6366f1" />

              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-16 h-3 bg-gradient-to-r from-purple-600 to-purple-400 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          <div className="absolute inset-y-0 left-1 w-1 bg-black"></div>
          <div className="absolute inset-y-0 left-3 w-1 bg-black"></div>
          <div className="absolute inset-y-0 left-5 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-1 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-3 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-5 w-1 bg-black"></div>
        </div> */}

        <div className="absolute inset-0 w-40 h-40 border-2 border-purple-400/20 rounded-full animate-ping shadow-[0_0_50px_rgba(168,85,247,0.3)]"></div>

        <div className="absolute -inset-4 w-48 h-48 border border-purple-500/10 rounded-full animate-pulse"></div>
      </div>

      <div className="mt-8">
        <p className="text-purple-300 text-sm font-light tracking-wider animate-pulse">Cinema is loading</p>
      </div>
    </div>
  )
}

export default Loader
