// firebase.js — Firebase initialization
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDsp3rCUr97oAK-M3eX9JYqCHi-23ii7A8",
  authDomain: "gen-lang-client-0008682103.firebaseapp.com",
  projectId: "gen-lang-client-0008682103",
  storageBucket: "gen-lang-client-0008682103.firebasestorage.app",
  messagingSenderId: "699750555373",
  appId: "1:699750555373:web:f4f9b0a65b7cdd955536e4"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db   = getFirestore(app, "ai-studio-378c97ba-1b61-4e66-b0db-c57974604ecf")
export const googleProvider = new GoogleAuthProvider()
