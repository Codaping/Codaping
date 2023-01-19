import type { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig: FirebaseOptions = {
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
