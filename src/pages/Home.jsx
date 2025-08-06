import React from "react";
import { dummyMovies } from "../data/dummyMovies";
import MovieCard from "../components/MovieCard";

const Home = () => {
  return (
    <div className="bg-dark min-h-screen text-light p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Movies</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
