import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDiGprj74JwK7zj2PkFIlh5XMxlM4LhQrw",
  authDomain: "antbus-4a824.firebaseapp.com",
  projectId: "antbus-4a824",
  storageBucket: "antbus-4a824.firebasestorage.app",  // ✅ MUST MATCH bucket
  messagingSenderId: "264435738912",
  appId: "1:264435738912:web:c64da953866fb5879e8f45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);