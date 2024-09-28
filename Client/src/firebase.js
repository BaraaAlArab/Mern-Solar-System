import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  authDomain: "solarsystemenergy-19914.firebaseapp.com",
  projectId: "solarsystemenergy-19914",
  storageBucket: "solarsystemenergy-19914.appspot.com",
  messagingSenderId: "1057009572707",
  appId: "1:1057009572707:web:c6e785ec06c5e39ef1d156",
  measurementId: "G-K5ZR2N39TK",
};

export const app = initializeApp(firebaseConfig);
