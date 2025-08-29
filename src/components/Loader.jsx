function Loader() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-black relative overflow-hidden">
      
      <div className="relative">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* OUTERMOST (faintest, slowest) */}
          <div className="absolute inset-0" style={{ transform: "rotate(12deg)" }}>
            <div className="absolute inset-0 rounded-full border border-white/25">
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "36s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-transparent border border-white/30"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RING 2 */}
          <div className="absolute inset-4" style={{ transform: "rotate(145deg)" }}>
            <div className="absolute inset-0 rounded-full border border-white/35">
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "32s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-transparent border border-white/45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RING 3 */}
          <div className="absolute inset-8" style={{ transform: "rotate(218deg)" }}>
            <div className="absolute inset-0 rounded-full border border-white/45">
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "28s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-transparent border border-white/60"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RING 4 */}
          <div className="absolute inset-12" style={{ transform: "rotate(290deg)" }}>
            <div className="absolute inset-0 rounded-full border border-white/60">
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "24s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-transparent border border-white/75"></div>
                </div>
              </div>
            </div>
          </div>

          {/* INNERMOST (brightest, still slow) */}
          <div className="absolute inset-16" style={{ transform: "rotate(35deg)" }}>
            <div className="absolute inset-0 rounded-full border border-white/75">
              <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "20s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <div className="w-2 h-2 rounded-full bg-transparent border border-white/90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center label */}
          <div className="relative z-10 text-white tracking-tight font-black text-xl">F0</div>
        </div>
    </div>

      <div className="mt-8 text-center">
        <p className="text-white font-medium mb-1 font-mono text-lg">Loading</p>
        <p className="text-gray-400 text-sm font-sans">Cinema...</p>
      </div>
    </div>
  )
}

export default Loader
