import React from "react";
import MicIcon from "@material-ui/icons/Mic";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import "./Subheader.css";
function Subheader() {
  return (
    <div className="subheader">
      <div className="subheader__title">
        <h2>ServerName</h2>
        <ExpandMoreIcon />
      </div>
      <div className="subheader__info">
        <span>#</span> <h3>Channel name</h3>
      </div>
      <div className="subheader__icons">
        <NotificationsIcon />
        <PeopleAltIcon />
        <div className="subheader__input">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>

        <CallToActionIcon />
        <HelpIcon />
      </div>
    </div>
  );
}

export default Subheader;
