import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (set, form = {}) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { set, form },
  });
};

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: {},
  });
};
