import { GET_CHANNEL, SET_CHANNEL } from "./../types";

export function setChannelAction(channels) {
  return (dispatch) => {
    dispatch(setChannel(channels));
  };
}
const setChannel = (channels) => ({
  type: SET_CHANNEL,
  payload: channels,
});

export function getChannelInfoAction(channel, id, user) {
  return (dispatch) => {
    dispatch(getChannel(channel, id, user));
  };
}

const getChannel = (channel, id, user) => ({
  type: GET_CHANNEL,
  payload: {
    channel,
    id,
    user,
  },
});
