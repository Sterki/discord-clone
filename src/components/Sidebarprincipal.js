import { Avatar, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const StyledMenu = withStyles({
  paper: {
    // border: "1px solid #d3d4d5",
    backgroundColor: "rgb(32, 34, 36)",
    border: "1px solid lightgray",
    color: "lightgray",
    fontWeight: "bold",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "rgb(32, 34, 36)",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
        fontWeight: "bold",
      },
    },
    "&:hover": {
      backgroundColor: "lightgray",
      color: "gray",
    },
  },
}))(MenuItem);

function Sidebarprincipal() {
  const user = useSelector((state) => state.user.user);
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    auth.signOut();
    db.collection("users")
      .doc(user.uid)
      .update({
        status: false,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClickConected = () => {
    db.collection("users")
      .doc(user.uid)
      .update({
        status: true,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClickDisconected = () => {
    db.collection("users")
      .doc(user.uid)
      .update({
        status: false,
      })
      .catch((error) => {
        console.log(error.message);
      });
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
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="sidebarprincipal">
      <div className="sidebarprincipal__channelcontent">
        <div className="sidebarprincipal__typechannel">
          <div className="sidebarprincipal__expandmoreicon">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
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
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={handleClickConected}>
            <ListItemIcon className="sidebarprincipal__conected">
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary="Conected" />
          </StyledMenuItem>
          <StyledMenuItem onClick={handleClickDisconected}>
            <ListItemIcon className="sidebarprincipal__disconected">
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary="Disconected" />
          </StyledMenuItem>
          <StyledMenuItem onClick={handleClickLogOut}>
            <ListItemIcon className="sidebarprincipal__logout">
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </StyledMenu>
        <div className="sidebarprincipal__avatar">
          <Avatar onClick={handleClickMenu} src={user.photo} />
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
