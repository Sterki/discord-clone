import { GET_MESSAGES } from "./../types";

const inisialState = {
  messages: [],
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
