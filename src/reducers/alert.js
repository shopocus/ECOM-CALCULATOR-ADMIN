import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  set: false,
  form: {
    set: false,
    page: "",
    type: "",
  },
};

const alertReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        set: false,
        form: initialState.form,
      };
    default:
      return state;
  }
};

export default alertReducer;
