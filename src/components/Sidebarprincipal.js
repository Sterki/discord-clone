import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Sidebarprincipal.css";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { auth } from "./../firebase";
import { useSelector, useDispatch } from "react-redux";
import Channel from "./Channel";
import db from "./../firebase";
import firebase from "firebase";
import { setChannelAction } from "./../actions/channelAction";

function Sidebarprincipal() {
  const user = useSelector((state) => state.user.user);
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const handleClick = () => {
    auth.signOut();
  };
  const handleClickAdd = () => {
    let channelname = prompt("Choice a name for your Channel");
    db.collection("channels")
      .add({
        channelName: channelname,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    db.collection("channels")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          setChannelAction(
            snapshot.docs.map((doc) => ({
              idchannel: doc.id,
              info: doc.data(),
            }))
          )
        );
      });
  }, []);
  return (
    <div className="sidebarprincipal">
      <div className="sidebarprincipal__channelcontent">
        <div className="sidebarprincipal__typechannel">
          <div className="sidebarprincipal__expandmoreicon">
            <ExpandMoreIcon />
            <h4>Channel Text</h4>
          </div>
          <div className="sidebarprincipal__addicon">
            <AddIcon onClick={handleClickAdd} />
          </div>
        </div>
        <div className="sidebarprincipal__channelname">
          {/* channels list here */}
          {channels.map((channel) => (
            <Channel
              key={channel.idchannel}
              id={channel.idchannel}
              channel={channel.info}
            />
          ))}
        </div>
      </div>
      <div className="sidebarprincipal__footer">
        <div className="sidebarprincipal__avatar">
          <Avatar onClick={handleClick} src={user.photo} />
          <div className="sidebarprincipal__username">
            <h4>{user.displayName}</h4>
            <p>#{user.uid.substring(0, 7)}</p>
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
