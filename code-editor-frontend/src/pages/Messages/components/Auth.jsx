import React from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';
import Navbar from "../../../components/navbar/navbar.jsx";
import Footer from "../../../components/footer/footer.jsx";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(), provider);
      console.log(result.user.reloadUserInfo.screenName);
      const token = await result.user.getIdToken(); // Get the GitHub token
      const user = result.user;
      cookies.set("auth-token", token); // Store the token in cookies
      cookies.set("user-name", user.displayName); // Store the user name in cookies
      setIsAuth(true); // Set the authentication state
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  return (
    <div className="auth">
      <Navbar />
      <p>Sign in with GitHub to continue</p>
      <button onClick={signInWithGithub}>Sign in with GitHub</button>
      <Footer />
    </div>
  );
};
