// src/utilis/watchLater.js
import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

/**
 * Add a movie/TV show to Watch Later
 * @param {string} userUID
 * @param {object} item
 */
export const addToWatchLater = async (userUID, item) => {
  if (!userUID) return;

  try {
    // Use TMDB id as docId for uniqueness
    const itemRef = doc(db, "watchLater", userUID, "items", String(item.id));
    await setDoc(itemRef, { ...item, id: item.id, type: item.type }, { merge: true });

    console.log("✅ Added to Watch Later:", item);
  } catch (error) {
    console.error("❌ Error adding to Watch Later:", error);
  }
};

/**
 * Remove a movie/TV show from Watch Later
 * @param {string} userUID
 * @param {string|number} itemId
 */
export const removeFromWatchLater = async (userUID, itemId) => {
  if (!userUID) return;

  try {
    const itemRef = doc(db, "watchLater", userUID, "items", String(itemId));
    await deleteDoc(itemRef);

    console.log("🗑️ Removed from Watch Later:", itemId);
  } catch (error) {
    console.error("❌ Error removing from Watch Later:", error);
  }
};

/**
 * Get all Watch Later items for a user
 * @param {string} userUID
 */
export const getWatchLater = async (userUID) => {
  if (!userUID) return [];

  try {
    const colRef = collection(db, "watchLater", userUID, "items");
    const snapshot = await getDocs(colRef);

    // Return array with docId included for easy removal later
    return snapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      docId: docSnap.id,
    }));
  } catch (error) {
    console.error("❌ Error fetching Watch Later:", error);
    return [];
  }
};
