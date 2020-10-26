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
          <p className="messageprivate__time1">
            {new Date(privatemessage.created?.toDate())
              .toLocaleTimeString()
              .substring(0, 5)}
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
          <p className="messageprivate__time2">
            {new Date(privatemessage.created?.toDate())
              .toLocaleTimeString()
              .substring(0, 5)}
          </p>
        </div>
      )}
    </>
  );
}

export default MessagePrivate;
