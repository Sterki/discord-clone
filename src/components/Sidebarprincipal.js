import { Avatar } from "@material-ui/core";
import React from "react";
import "./Sidebarprincipal.css";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
function Sidebarprincipal() {
  return (
    <div className="sidebarprincipal">
      <div className="sidebarprincipal__channelcontent">
        <div className="sidebarprincipal__typechannel">
          <div className="sidebarprincipal__expandmoreicon">
            <ExpandMoreIcon />
            <h4>Channel Text</h4>
          </div>
          <div className="sidebarprincipal__addicon">
            <AddIcon />
          </div>
        </div>

        <div className="sidebarprincipal__channelname">
          <span>#</span>
          <p>jugosos</p>
        </div>
      </div>
      <div className="sidebarprincipal__footer">
        <div className="sidebarprincipal__avatar">
          <Avatar />
          <div className="sidebarprincipal__username">
            <h4>Yami</h4>
            <p>#2342</p>
          </div>
        </div>
        <div className="sidebarprincipal__icons">
          <MicIcon />
          <HeadsetMicIcon />
          <BrightnessLowIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebarprincipal;
