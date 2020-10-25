import { SET_USER_AUTH } from "../types";

const inisialState = {
  user: null,
};

export default (state = inisialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
