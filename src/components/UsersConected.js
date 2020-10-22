import { Avatar } from "@material-ui/core";
import React from "react";
import "./UsersConected.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function UsersConected({ userconec }) {
  return (
    <div className="usersconected">
      <Avatar src={userconec.photo} />
      <h5>{userconec.displayName}</h5>
      <FiberManualRecordIcon />
    </div>
  );
}

export default UsersConected;
