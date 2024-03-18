// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//console.log(apiKey);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ae1f3.firebaseapp.com",
  projectId: "mern-blog-ae1f3",
  storageBucket: "mern-blog-ae1f3.appspot.com",
  messagingSenderId: "206536770417",
  appId: "1:206536770417:web:f7307d02aa54dbf2dd6cd0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
