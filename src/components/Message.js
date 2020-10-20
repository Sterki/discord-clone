import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";
function Message() {
  return (
    <div className="message">
      <div className="message__info">
        <Avatar />
        <p>Date here</p>
      </div>
      <div className="message__content">
        <p>Some kind of text</p>
      </div>
    </div>
  );
}

export default Message;
