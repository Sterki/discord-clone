import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ post, id, created, user }) {
  return (
    <div className="message">
      <div className="message__info">
        <Avatar src={user.photo} />
        <p>{user.displayName}</p>
        {/* <span>{new Date(created?.toDate()).toLocaleDateString()}</span> */}
        <span>{new Date(created?.toDate()).toDateString()}</span>
      </div>
      <div className="message__content">
        <p>{post.post}</p>
      </div>
    </div>
  );
}

export default Message;
