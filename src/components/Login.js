import React from "react";
import { auth, provider } from "../firebase";
import "./Login.css";

function Login() {
  const handleClick = (e) => {
    e.preventDefault();

    auth
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("login Succesfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <img
        src="https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cb/Discordbanner.png/600px-Discordbanner.png"
        alt=""
      />
      <button type="submit" onClick={handleClick}>
        Sign In with google
      </button>
    </div>
  );
}

export default Login;
