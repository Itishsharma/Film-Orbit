// src/components/utilis/WatchLater.js

import { useEffect, useState } from "react";
import { auth, db } from "../../utilis/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// 🔹 Named export (helper function for adding)
export const addToWatchLater = async (movie) => {
  if (!auth.currentUser) {
    alert("Please log in to save movies");
    return;
  }

  const userUID = auth.currentUser.uid;
  const docRef = doc(db, "users", userUID, "watchLater", movie.id.toString());

  await setDoc(docRef, movie);
  alert(`${movie.title || movie.name} added to Watch Later`);
};

// 🔹 Default export (React component)
function WatchLater() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      if (!auth.currentUser) return;
      const userUID = auth.currentUser.uid;
      const querySnapshot = await getDocs(
        collection(db, "users", userUID, "watchLater")
      );
      const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMovies(list);
    };
    fetchWatchLater();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Watch Later</h2>
      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.poster}`}
                alt={movie.title || movie.name}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-2 bg-white/10 text-white">
                <p className="font-semibold">{movie.title || movie.name}</p>
                <p className="text-xs">{movie.media_type?.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchLater;
