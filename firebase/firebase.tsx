// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC21p6drBSulowplRo86rh1w4M6nvMnZN4",
  authDomain: "festivalp-13012.firebaseapp.com",
  projectId: "festivalp-13012",
  storageBucket: "festivalp-13012.appspot.com",
  messagingSenderId: "657459253162",
  appId: "1:657459253162:web:c067979c2c98a48354e5d3",
  measurementId: "G-644PBG2X15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);