import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClAZ-ueuOk0XZENQaeq65U3wqikIYVnZI",
  authDomain: "plateshare-saiful.firebaseapp.com",
  projectId: "plateshare-saiful",
  storageBucket: "plateshare-saiful.appspot.com",
  messagingSenderId: "625715388812",
  appId: "1:625715388812:web:470d9cb175ba48f90236a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth export
export const auth = getAuth(app);

export default app;
