import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./UsersDisconected.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import db from "./../firebase";
import firebase from "firebase";
import MessagePrivate from "./MessagePrivate";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "rgb(32, 34, 36)",
    color: " #a6a6a6",
    borderRadius: "15px",
    padding: "0.2rem",
    minWidth: "6rem",
    "&:hover": {
      color: "white",
    },
  },
  menuitem: {
    backgroundColor: "rgb(32, 34, 36)",
    color: " #a6a6a6",
    fontWeight: "600",
    fontSize: "0.8rem",
    "&:hover": {
      color: "white",
    },
  },
}));

function UsersConected({ userdisc }) {
  const user = useSelector((state) => state.user.user);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [messager, setMessage] = useState({
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [escribiendo, setEscribiendo] = useState(false);

  const { message } = messager;
  const handleOpen = () => {
    setOpen(true);
    let chat = document.getElementById("userdisconected__chat");
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSendMessage = (e) => {
    e.preventDefault();
    setEscribiendo(false);
    if (message !== "") {
      setEscribiendo(false);
      db.collection("users")
        .doc(userdisc.uid)
        .collection("messages")
        .add({
          message: message,
          receptor: user.uid,
          classname: "sender",
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          alert(error.message);
        });
      db.collection("users")
        .doc(user.uid)
        .collection("messages")
        .add({
          message: message,
          receptor: userdisc.uid,
          classname: "recepter",
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          alert(error.message);
        });
      setEscribiendo(false);
      setMessage({ message: "" });
      let chat = document.getElementById("userdisconected__chat");
      chat.scrollTop = chat.scrollHeight;
    }
  };

  useEffect(() => {
    db.collection("users")
      .doc(userdisc.uid)
      .collection("messages")
      .where("receptor", "==", user.uid)
      .orderBy("created", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, infomessage: doc.data() }))
        );
      });
  }, [user.uid, userdisc.uid]);
  const handleChangeMessage = (e) => {
    setEscribiendo(true);
    console.log(escribiendo);
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="userdisconected">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="userdisconected__modal">
            <div className="userdisconected__titlemodal">
              <h2 id="transition-modal-title">
                Chating with: {userdisc.displayName}
              </h2>
              <p className={escribiendo ? "loading" : "noloading"}>
                someone's writing
              </p>
            </div>

            <div className="userdisconected__chatcontainer">
              <div className="userdisconected__chat" id="userdisconected__chat">
                {/* message here */}

                {messages?.map((mess) => (
                  <MessagePrivate
                    key={mess.id}
                    privatemessage={mess.infomessage}
                  />
                ))}
              </div>
              <div className="userdisconected__sidebar">
                <Avatar src={userdisc.photo} />
              </div>
            </div>
            <form>
              <div className="userdisconected__userinfoinput">
                <Avatar src={user.photo} />
                <input
                  type="text"
                  placeholder="type a message ...."
                  name="message"
                  value={message}
                  onChange={handleChangeMessage}
                />
                <button type="submit" onClick={handleClickSendMessage}>
                  Send message
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
      {user.uid !== userdisc.uid ? (
        <Menu
          className={classes.menu}
          menuButton={<Avatar src={userdisc.photo} />}
        >
          <MenuItem onClick={handleOpen} className={classes.menuitem}>
            Send a message
          </MenuItem>
          {/* <MenuItem>Add as Friend</MenuItem>
        <MenuItem>Report User</MenuItem> */}
        </Menu>
      ) : (
        <Avatar src={userdisc.photo} />
      )}
      <h5>{userdisc.displayName}</h5>
      <FiberManualRecordIcon />
    </div>
  );
}

export default UsersConected;
