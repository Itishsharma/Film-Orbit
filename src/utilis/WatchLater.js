import { db, auth } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

/**
 * ➕ Add a movie/show to Watch Later
 */
export const addToWatchLater = async (item) => {
  if (!auth.currentUser) {
    alert("You must be logged in to add to Watch Later")
    return
  }

  const userUID = auth.currentUser.uid
  const docRef = doc(db, "watchLater", userUID)
  const docSnap = await getDoc(docRef)

  let watchList = []
  if (docSnap.exists()) {
    watchList = docSnap.data().list || []
  }

  // prevent duplicates
  const exists = watchList.some((m) => m.id === item.id)
  if (exists) return

  watchList.push(item)
  await setDoc(docRef, { list: watchList })
}

/**
 * 📥 Get Watch Later list
 */
export const getWatchLater = async () => {
  if (!auth.currentUser) return []

  const userUID = auth.currentUser.uid
  const docRef = doc(db, "watchLater", userUID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data().list || []
  }
  return []
}

/**
 * ❌ Remove from Watch Later
 */
export const removeFromWatchLater = async (id) => {
  if (!auth.currentUser) return

  const userUID = auth.currentUser.uid
  const docRef = doc(db, "watchLater", userUID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    let watchList = docSnap.data().list || []
    watchList = watchList.filter((m) => m.id !== id)
    await setDoc(docRef, { list: watchList })
  }
}
