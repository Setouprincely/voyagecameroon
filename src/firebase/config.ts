import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// In a real application, these values would be stored in environment variables
const firebaseConfig = {
  apiKey: "AIzaSyB8nmqW8rDXr7bxS8MkLeGZQjlmI-zVvCQ",
  authDomain: "voyagecameroon.firebaseapp.com",
  projectId: "voyagecameroon",
  storageBucket: "voyagecameroon.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
