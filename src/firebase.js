// src/firebase.js

// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA5FikMxdcXdS5kvDkVPjsDoieI09SbCYE",
  authDomain: "local-room-baba.firebaseapp.com",
  projectId: "local-room-baba",
  storageBucket: "local-room-baba.appspot.com",
  messagingSenderId: "760292005526",
  appId: "1:760292005526:web:5f6c4fd9428fd784c554b7",
  measurementId: "G-Q2ZP3RVRQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
