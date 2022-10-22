import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0IwjuYYMZXg6ee5Lr18J5E8J0v7BtYXk",
  authDomain: "rental-app-ce9fd.firebaseapp.com",
  projectId: "rental-app-ce9fd",
  storageBucket: "rental-app-ce9fd.appspot.com",
  messagingSenderId: "661840639844",
  appId: "1:661840639844:web:76d18a1a9e971216aaec71",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
