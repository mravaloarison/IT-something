import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOeR3Ci2uEf1z-PzxfgtiDfrvpV9O4AK4",
    authDomain: "it-something.firebaseapp.com",
    projectId: "it-something",
    storageBucket: "it-something.firebasestorage.app",
    messagingSenderId: "1090325644636",
    appId: "1:1090325644636:web:b07ce9007c3d493af5ed99"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function ContinueWithGoogle() {
    signInWithPopup(auth, provider) 
  .then(() => {
    location.href = "/";
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
}

// DB
// const db = getFirestore(app);