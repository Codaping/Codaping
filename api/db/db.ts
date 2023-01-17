// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRk17lfj7Z8L2gPYh4LNUbJLS0IHE5D1k",
  authDomain: "codaping-4ab51.firebaseapp.com",
  projectId: "codaping-4ab51",
  storageBucket: "codaping-4ab51.appspot.com",
  messagingSenderId: "734479402039",
  appId: "1:734479402039:web:0ff384282b9a646a446bb2",
  measurementId: "G-ZXGRWEBQV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);
