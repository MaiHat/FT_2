// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//import { getFirestone } from "firebase/firestone";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpP_oQzFiCZM14S72XtbfbgyHBe8A8s0E",
  authDomain: "fitnesstracker-3d71e.firebaseapp.com",
  projectId: "fitnesstracker-3d71e",
  storageBucket: "fitnesstracker-3d71e.firebasestorage.app",
  messagingSenderId: "1084208171722",
  appId: "1:1084208171722:web:5f12c4e7d9731552c78233",
  measurementId: "G-CFF09SLC71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
