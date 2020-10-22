import React from "react";
import db, { auth, provider } from "../firebase";
import "./Login.css";

function Login() {
  const handleClick = (e) => {
    e.preventDefault();

    auth
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("login Succesfully");
        db.collection("users").doc(result.user.uid).set({
          displayName: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          uid: result.user.uid,
          status: true,
        });
        // .where("uid", "==", result.user.uid)
        // .get()
        // .then(function (doc) {
        //   if (doc) {
        //     db.collection("users").doc(result.user.uid).set({
        //       status: "disconected",
        //     });
        //   } else {
        //     db.collection("users").add({
        //       displayName: result.user.displayName,
        //       photo: result.user.photoURL,
        //       uid: result.user.uid,
        //       email: result.user.email,
        //       status: "conected",
        //     });
        //   }
        // })
        // .catch((error) => {
        //   alert(error.message);
        // });
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
