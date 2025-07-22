// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoPQVUlcwEmsRaS-GiEg4qfB6SvEHhtyU",
  authDomain: "subscription-tr.firebaseapp.com",
  projectId: "subscription-tr",
  storageBucket: "subscription-tr.firebasestorage.app",
  messagingSenderId: "152263149627",
  appId: "1:152263149627:web:f79b832592093aca6a741e",
  measurementId: "G-K8KSTKXLBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app; 