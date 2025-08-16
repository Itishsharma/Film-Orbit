// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_API_KEY,
//   authDomain:import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL:import.meta.env.VITE_DATABASE_URL,
//   projectId:import.meta.env.VITE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId:import.meta.env.VITE_APP_ID,
//   measurementId:import.meta.env.VITE_MEASUREMENT_ID
// };

// console.log(import.meta.env.VITE_MESSAGING_SENDER_ID);

// const app = initializeApp(firebaseConfig);
// export const auth= getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBZWllgQzCioYQhK9ZKS_pRrUX_SgTA29w",
  authDomain: "moive-app-a571a.firebaseapp.com",
  databaseURL: "https://moive-app-a571a-default-rtdb.firebaseio.com",
  projectId: "moive-app-a571a",
  storageBucket: "moive-app-a571a.appspot.com",
  messagingSenderId: "1045851090942",
  appId: "1:1045851090942:web:750e04d46462aaa4761aaf",
  measurementId: "G-93EPGKGF53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider=new GoogleAuthProvider();