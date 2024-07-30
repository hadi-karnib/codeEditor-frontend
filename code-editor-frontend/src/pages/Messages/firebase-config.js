// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore}  from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUOEki9d4y-7rTJN_UMOPqB9QwIfuD83U",
  authDomain: "codraeditor.firebaseapp.com",
  projectId: "codraeditor",
  storageBucket: "codraeditor.appspot.com",
  messagingSenderId: "304048215537",
  appId: "1:304048215537:web:1941bcede8e3d8ba146050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// tell wich app to authenticate
export const auth = getAuth(app)
// handling authentication through google
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)
