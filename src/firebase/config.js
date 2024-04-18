// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrYmLYyt7Q1BQeYGsRIO5aQmFaKIJIQs8",
    authDomain: "tv-track-24.firebaseapp.com",
    projectId: "tv-track-24",
    storageBucket: "tv-track-24.appspot.com",
    messagingSenderId: "952816593759",
    appId: "1:952816593759:web:b925bb29cf9d0aa9c6a4ea"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }