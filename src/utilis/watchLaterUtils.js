// src/components/utilis/watchLaterUtils.js
import { auth, db } from "../../utilis/firebase";
import { doc, setDoc } from "firebase/firestore";

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
