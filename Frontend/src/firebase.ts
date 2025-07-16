// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase config (your actual config is fine)
const firebaseConfig = {
  apiKey: "AIzaSyBxUx1riiKBUTyC7u0bcCzbAiJT75QG6T8",
  authDomain: "interview-prep-tracker2025.firebaseapp.com",
  projectId: "interview-prep-tracker2025",
  storageBucket: "interview-prep-tracker2025.firebasestorage.app",
  messagingSenderId: "212540113301",
  appId: "1:212540113301:web:1a968e5d71f8f785abf69c",
  measurementId: "G-6JE38EZQ89"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Set up Authentication and export it
export const auth = getAuth(app);

// ✅ (Optional) Initialize Analytics (not needed for auth)
getAnalytics(app);
