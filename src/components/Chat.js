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
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import UIfx from "uifx";
import discord from "./../static/sounds/discord-notification.mp3";

const bell = new UIfx(discord, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

function Chat() {
  const [message, setMessage] = useState("");
  const channelid = useSelector((state) => state.channels.channelinfo?.id);
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (message === "") {
      return;
    } else {
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
      bell.play();
      let chat = document.getElementById("chat__chatcontainer");
      chat.scrollTop = chat.scrollHeight;
    }
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
  }, [channelid, dispatch]);

  return (
    <div className="chat">
      <div className="chat__chatcontainer" id="chat__chatcontainer">
        {channelid ? (
          messages.map((message) => (
            <Message
              key={message.messageid}
              post={message.post}
              user={message.post.user}
              created={message.post.created}
              id={message.messageid}
            />
          ))
        ) : (
          <>
            <h1>Wellcome to the chat</h1>
            <div className="chat__wellcome">
              <Filter1Icon />
              <p>
                If you're new as a developer or just want to program a little,
                this is the best place to get all your doubts about web
                development
              </p>
            </div>
            <div className="chat__wellcome">
              <Filter2Icon />
              <p>
                Select a channel and start a conversation, people will see your
                comment immediately and solve your problems or doubts
              </p>
            </div>
            <p>
              ##############################################################
            </p>
            <p>Let's code!!!!</p>
          </>
        )}
      </div>

      <div className="chat__inputmessage">
        {channelid ? (
          <>
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
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Chat;
