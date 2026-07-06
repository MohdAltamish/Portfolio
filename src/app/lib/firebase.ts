// ============================================================
// 🔑 FIREBASE CONFIGURATION
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBurXq9Lwpplh2prUQzuhEu884Ns54ZVPg",
  authDomain: "portfolio-bb702.firebaseapp.com",
  projectId: "portfolio-bb702",
  storageBucket: "portfolio-bb702.firebasestorage.app",
  messagingSenderId: "878863165325",
  appId: "1:878863165325:web:9890725bbc7e349c6effc4",
  measurementId: "G-YX7CMQM3FN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
