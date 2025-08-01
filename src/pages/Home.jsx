import React from "react";
import movies from "../data/dummyMovies"; // ✅ adjust if your path is different

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-6">
      <h1 className="text-4xl text-white font-bold mb-6 text-center">Film Orbit 🎬</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl overflow-hidden shadow-lg border border-orange-500/20 p-4 bg-black/50 backdrop-blur-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-72 object-cover rounded-xl"
              onError={(e) =>
                (e.target.src =
                  'https://via.placeholder.com/300x450?text=No+Image')
              }
            />
            <h2 className="text-white text-xl font-bold mt-3">{movie.name}</h2>
            <p className="text-orange-400">{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;