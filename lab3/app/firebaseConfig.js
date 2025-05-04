// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1XygQQmX9r3fmW1uG8u32r8xpDXUGuGM",
  authDomain: "yggdrasil-bookstore.firebaseapp.com",
  projectId: "yggdrasil-bookstore",
  storageBucket: "yggdrasil-bookstore.firebasestorage.app",
  messagingSenderId: "203855556192",
  appId: "1:203855556192:web:1d90b37381ab07d9111d05",
  measurementId: "G-L2MJEG17J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
