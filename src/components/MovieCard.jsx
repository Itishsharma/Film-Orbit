<div className="bg-gray-800 text-white rounded shadow hover:scale-105 transition">
  <img
    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
    alt={movie.title}
    className="w-full h-64 object-cover rounded-t"
  />
  <div className="p-3">
    <h2 className="text-lg font-semibold">{movie.title}</h2>
    <p className="text-yellow-400">⭐ {movie.vote_average}</p>
    
  </div>
</div>