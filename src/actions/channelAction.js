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

export function getChannelInfoAction(channel, id) {
  return (dispatch) => {
    dispatch(getChannel(channel, id));
  };
}

const getChannel = (channel, id) => ({
  type: GET_CHANNEL,
  payload: {
    channel,
    id,
  },
});
