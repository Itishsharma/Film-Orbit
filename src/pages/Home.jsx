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
    <div>
      <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-xl p-2 w-[150px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md"
            />
            <h3 className="text-white mt-2 text-sm">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
