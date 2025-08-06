import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-background text-light p-4 rounded-2xl shadow-md hover:shadow-lg transition">
      <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover rounded-xl mb-2" />
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p className="text-sm text-gray-400">{movie.genre.join(", ")}</p>
      <p className="text-sm">Year: {movie.year}</p>
      <p className="text-sm">Rating: {movie.rating}</p>
    </div>
  );
};

export default MovieCard;
