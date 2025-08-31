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
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCzH43oFhXkrozplJpOUH_YGjLDxmfm_ss",
  authDomain: "film-orbit.firebaseapp.com",
  databaseURL: "https://film-orbit-default-rtdb.firebaseio.com/",
  projectId: "film-orbit",
  storageBucket: "film-orbit.firebasestorage.app",
  messagingSenderId: "61965602710",
  appId: "1:61965602710:web:bb8a7811bd9ba17287d7b7",
  measurementId: "G-GW08FDX0XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
