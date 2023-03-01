// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyALGXwGEqpPF2WGkxk_xSW0_uF8WIECEfE",
    authDomain: "fallguard.firebaseapp.com",
    projectId: "fallguard",
    storageBucket: "fallguard.appspot.com",
    messagingSenderId: "49618511821",
    appId: "1:49618511821:web:37ecfc815b0f976f5b0684",
    measurementId: "G-061HDRP1M2"
};

// Initialize Firebase
if (getApps().length === 0) initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore();
//todo remove
// connectFirestoreEmulator(db, "localhost", 8078);
// connectAuthEmulator(auth, "http://localhost:9098");
