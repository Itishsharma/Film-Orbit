function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-black">
      <div className="relative">
        
        <div className="relative w-32 h-32">
          
          <div className="absolute inset-0 border-4 border-amber-400 rounded-full animate-spin">
            
            <div className="absolute w-3 h-3 bg-black rounded-full top-2 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full bottom-2 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full left-2 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full right-2 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full top-4 left-4"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full top-4 right-4"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full bottom-4 left-4"></div>
            <div className="absolute w-3 h-3 bg-black rounded-full bottom-4 right-4"></div>
          </div>

          
          <div className="absolute inset-4 bg-amber-400 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-black rounded-full"></div>
          </div>
        </div>

        
        <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-12 h-2 bg-amber-400 animate-pulse">
          <div className="absolute inset-y-0 left-0 w-1 bg-black"></div>
          <div className="absolute inset-y-0 left-2 w-1 bg-black"></div>
          <div className="absolute inset-y-0 left-4 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-0 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-2 w-1 bg-black"></div>
          <div className="absolute inset-y-0 right-4 w-1 bg-black"></div>
        </div>

        
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-amber-400 font-mono text-lg">
          <span className="animate-pulse">Loading Cinema...</span>
        </div>

        
        <div className="absolute inset-0 w-32 h-32 border-2 border-amber-400/30 rounded-full animate-ping"></div>
      </div>

      
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-400/20 via-transparent to-amber-400/20 animate-pulse"></div>
    </div>
  )
}

export default Loader
