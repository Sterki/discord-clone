import React from "react";
import "./Channel.css";
import { useDispatch } from "react-redux";
import { getChannelInfoAction } from "../actions/channelAction";
import UIfx from "uifx";
import joined from "./../static/sounds/joined.mp3";

const sound = new UIfx(joined, {
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

function Channel({ channel, id }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(getChannelInfoAction(channel.channelName, id));
    sound.play();
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
