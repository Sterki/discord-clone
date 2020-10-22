import { combineReducers } from "redux";
import userReducer from "./userReducer";
import channelReducer from "./channelReducer";
import messageReducer from "./messagesReducer";

export default combineReducers({
  user: userReducer,
  channels: channelReducer,
  messages: messageReducer,
});
