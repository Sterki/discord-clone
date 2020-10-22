import { Avatar } from "@material-ui/core";
import React from "react";
import "./UsersDisconected.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function UsersConected({ userdisc }) {
  return (
    <div className="userdisconected">
      <Avatar src={userdisc.photo} />
      <h5>{userdisc.displayName}</h5>
      <FiberManualRecordIcon />
    </div>
  );
}

export default UsersConected;
