import React, { useEffect, useState } from "react";
import "./SidebarRight.css";
import db from "./../firebase";
import UsersConected from "./UsersConected";
import UserDisconected from "./UserDisconected";

function SidebarRight() {
  const [userconected, setUserconected] = useState([]);
  const [userdisconected, setUserDisconected] = useState([]);

  useEffect(() => {
    let isTrue = false;
    db.collection("users")
      .where("status", "==", false)
      .onSnapshot((snapshot) => {
        if (!isTrue) {
          setUserDisconected(snapshot.docs.map((doc) => doc.data()));
        }
      });
    return () => {
      isTrue = true;
    };
  }, []);
  useEffect(() => {
    let isTrue = true;
    db.collection("users")
      .where("status", "==", true)
      .onSnapshot((snapshot) => {
        if (isTrue) {
          setUserconected(snapshot.docs.map((doc) => doc.data()));
        }
      });
    return () => {
      isTrue = false;
    };
  }, []);

  return (
    <div className="sidebarright">
      <div className="sidebarright__conected">
        <h4>Conected-</h4>
        {userconected.map((userconec) => (
          <UsersConected key={userconec.uid} userconec={userconec} />
        ))}
      </div>
      <div className="sidebarright__conected">
        <h4>Disconected-</h4>
        {userdisconected.map((userdisc) => (
          <UserDisconected key={userdisc.uid} userdisc={userdisc} />
        ))}
      </div>
    </div>
  );
}

export default SidebarRight;
