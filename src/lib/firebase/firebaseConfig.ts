import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId:import.meta.env.VITE_FIREBASE_APPID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAnKDUEjPubZ_JpW6MKAjXc9hUp-waGEGg",
//     authDomain: "tech-net-d4c5f.firebaseapp.com",
//     projectId: "tech-net-d4c5f",
//     storageBucket: "tech-net-d4c5f.appspot.com",
//     messagingSenderId: "592473307354",
//     appId: "1:592473307354:web:ecdcd4f8769494086a8de3"
//   };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
