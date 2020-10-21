import { GET_CHANNEL, SET_CHANNEL } from "./../types";

const inisialState = {
  channels: [],
  channelinfo: null,
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      return {
        ...state,
        channels: action.payload,
      };
    case GET_CHANNEL:
      return {
        ...state,
        channelinfo: action.payload,
      };
    default:
      return state;
  }
};
