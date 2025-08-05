import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies()
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching movies", err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold my-6 text-center">Popular Movies</h2>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-xl p-4 w-[200px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full h-auto"
            />
            <h3 className="text-white mt-3 text-base text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
