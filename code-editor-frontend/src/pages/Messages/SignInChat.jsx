// SignIn.js
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}