import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

export async function addUser(data: any) {
  const userRef = doc(db, "users", data.email);
  await setDoc(userRef, data);
}

export async function isUser(email: string) {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export async function getUser(email: string) {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}