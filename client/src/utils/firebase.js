// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-43bba.firebaseapp.com",
  projectId: "taskmanager-43bba",
  storageBucket: "taskmanager-43bba.appspot.com",
  messagingSenderId: "539168653269",
  appId: "1:539168653269:web:6ac4280368b2a481a3875c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
