import { Avatar } from "@material-ui/core";
import React from "react";
import "./MessagePrivate.css";

function MessagePrivate({ privatemessage }) {
  return (
    <>
      {privatemessage.classname === "sender" ? (
        <div className="messageprivate">
          <p
            className={`${
              privatemessage.classname === "sender"
                ? "messageprivate__ptag2color"
                : "messageprivate__ptag1color"
            }`}
          >
            {privatemessage.message}
          </p>
          <p className="messageprivate__time">
            {new Date(privatemessage.created?.toDate()).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <div className="messageprivate2">
          <p
            className={`${
              privatemessage.classname === "sender"
                ? "messageprivate__ptag2color"
                : "messageprivate__ptag1color"
            }`}
          >
            {privatemessage.message}
          </p>
          <p className="messageprivate__time">
            {new Date(privatemessage.created?.toDate()).toLocaleTimeString()}
          </p>
        </div>
      )}
    </>
  );
}

export default MessagePrivate;
