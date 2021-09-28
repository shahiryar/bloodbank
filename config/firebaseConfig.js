// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTMOaliXU5JvTLe13Gie3dYIBFc0n1uXM",
  authDomain: "bloodbank-77175.firebaseapp.com",
  databaseURL: "https://bloodbank-77175-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bloodbank-77175",
  storageBucket: "bloodbank-77175.appspot.com",
  messagingSenderId: "367787079596",
  appId: "1:367787079596:web:713b4cc3bab3709c1c2c09",
  measurementId: "G-P4VNQER4QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);