import { SET_USER_AUTH } from "./../types";

export function setUserAuthAction(userAuth) {
  return (dispatch) => {
    dispatch(setUserAuth(userAuth));
  };
}
const setUserAuth = (userAuth) => ({
  type: SET_USER_AUTH,
  payload: userAuth,
});
