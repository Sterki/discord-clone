import { GET_MESSAGES } from "./../types";

export function getMessageAction(messages) {
  return (dispatch) => {
    dispatch(getMessage(messages));
  };
}
const getMessage = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});
