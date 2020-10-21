import React from "react";
import "./Channel.css";
import { useDispatch } from "react-redux";
import { getChannelInfoAction } from "../actions/channelAction";

function Channel({ channel, id }) {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(getChannelInfoAction(channel.channelName, id));
  };
  return (
    <div className="channel">
      <span>#</span>
      <p onClick={(e) => handleClick(channel.channelName, id)}>
        {channel.channelName}
      </p>
    </div>
  );
}

export default Channel;
