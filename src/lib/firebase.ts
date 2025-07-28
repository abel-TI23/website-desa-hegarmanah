// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHeAgIZ0OE_xI7rcn1rIDoaLIL_MpXNsY",
  authDomain: "hegarmanah-web.firebaseapp.com",
  projectId: "hegarmanah-web",
  storageBucket: "hegarmanah-web.firebasestorage.app",
  messagingSenderId: "G1061810730132",
  appId: "1:1061810730132:web:053c0544347795bddcb081"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };