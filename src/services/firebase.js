// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARkQHbjw4_Tl-RVnRCTDe2YulLksipYeM",
  authDomain: "pokemon-store-45890.firebaseapp.com",
  projectId: "pokemon-store-45890",
  storageBucket: "pokemon-store-45890.firebasestorage.app",
  messagingSenderId: "934885967507",
  appId: "1:934885967507:web:cc17c591e411f44d3f2f66"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);