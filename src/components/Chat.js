import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import MoodIcon from "@material-ui/icons/Mood";
import db from "./../firebase";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import { getMessageAction } from "./../actions/messageAction";

function Chat() {
  const [message, setMessage] = useState("");
  const channelid = useSelector((state) => state.channels.channelinfo?.id);
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    db.collection("channels")
      .doc(channelid)
      .collection("messages")
      .add({
        post: message,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        user,
      })
      .catch((error) => {
        console.log(error.message);
      });
    setMessage("");
  };

  useEffect(() => {
    if (channelid) {
      db.collection("channels")
        .doc(channelid)
        .collection("messages")
        .orderBy("created", "asc")
        .onSnapshot((snapshot) => {
          dispatch(
            getMessageAction(
              snapshot.docs.map((doc) => ({
                messageid: doc.id,
                post: doc.data(),
              }))
            )
          );
        });
    }
  }, [channelid]);
  return (
    <div className="chat">
      <div className="chat__chatcontainer">
        {messages?.map((message) => (
          <Message
            key={message.messageid}
            post={message.post}
            user={message.post.user}
            created={message.post.created}
            id={message.messageid}
          />
        ))}
      </div>
      <div className="chat__inputmessage">
        <form className="chat__form">
          <div className="chat__input">
            <ControlPointIcon />
            <input
              type="text"
              placeholder="Send a message ..."
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" onClick={handleClick}>
              Send Message
            </button>
          </div>
        </form>
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
