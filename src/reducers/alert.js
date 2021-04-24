import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  set: false,
  type: "",
  form: {
    page: "",
    type: "",
  },
  calculation:{
    title: "",
    input: {},
    output:{}
  }
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
        ...initialState
      };
    default:
      return state;
  }
};

export default alertReducer;
