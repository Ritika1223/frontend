import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDTIcNaQH8u5-xELedhadNacGn06Xndzhs",
  authDomain: "fir-44d31.firebaseapp.com",
  projectId: "fir-44d31",
  storageBucket: "fir-44d31.appspot.com",
  messagingSenderId: "1033881515902",
  appId: "1:1033881515902:web:c36184054a754e0c29a52f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);