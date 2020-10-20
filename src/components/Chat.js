import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import Message from "./Message";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import MoodIcon from "@material-ui/icons/Mood";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__chatcontainer">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="chat__inputmessage">
        <div className="chat__input">
          <ControlPointIcon />
          <input type="text" placeholder="Send a message ..." />
        </div>
        <div className="chat__icons">
          <CardGiftcardIcon />
          <GifIcon />
          <MoodIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
