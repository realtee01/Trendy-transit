import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

// Use explicit configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyCtF5Yg-3px26IjV6_eZvTx6RnXMetda-A",
  authDomain: "trendytransit-37bb2.firebaseapp.com",
  projectId: "trendytransit-37bb2",
  storageBucket: "trendytransit-37bb2.firebasestorage.app",
  messagingSenderId: "322106956796",
  appId: "1:322106956796:web:9d77ba2246bee91a5db079"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
