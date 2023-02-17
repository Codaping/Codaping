import type { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore/lite";
import { connectStorageEmulator, getStorage } from "firebase/storage";

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
const EMULATORS_STARTED = "EMULATORS_STARTED";
export const storage = getStorage(app);

// @ts-ignore
if (!global[EMULATORS_STARTED]) {
  // @ts-ignore
  global[EMULATORS_STARTED] = true;
  connectFirestoreEmulator(getFirestore(), "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  console.log("emulator started");
}
