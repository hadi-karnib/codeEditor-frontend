// SignIn.js
import React from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider()
    try {
      await signInWithPopup(getAuth(), provider);
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  };

  return (
    <button onClick={signInWithGithub}>
      Sign in with Github
    </button>
  );
}