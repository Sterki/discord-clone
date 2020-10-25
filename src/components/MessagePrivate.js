import React from "react";

function MessagePrivate({ privatemessage }) {
  return (
    <div className="messageprivate">
      <p>{privatemessage.message}</p>
    </div>
  );
}

export default MessagePrivate;
