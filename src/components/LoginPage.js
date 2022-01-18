import React from "react";
import "./LoginPage.css";
import google from "../assets/img/google-logo-9808.png";
import whatsapp from "../assets/img/whatsapp-logo.png";
import { useNavigate } from "react-router-dom";
import db, { auth, googleProvider } from "../firebase";
import { useAuthContext } from "../context/authStore";
const LoginPage = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuthContext();

  const googleSignIn = async () => {
    try {
      const response = await auth.signInWithPopup(googleProvider);

      const newUser = {
        fullName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      signInUser(newUser);
      db.collection("user").doc(response.user.email).set(newUser);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={whatsapp} className="login-logo" alt="wtsp logo" />
        <p className="logo-name">Whatsapp web</p>
        <button className="login-btn" onClick={googleSignIn}>
          <img src={google} alt="login with google" />
          Login with google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
