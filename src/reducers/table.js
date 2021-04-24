import {
  SET_DATA,
  REMOVE_DATA,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/types";

const initialState = {
  column: [],
  data: [],
  editable: {},
  actions: [],
};

const tableReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        data: [...state.data, action.payload.newProduct],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        data: state.data.map((data) =>
          (data._id !== undefined &&
            data._id === action.payload.oldProduct._id) ||
            (data.type !== undefined &&
              data.type === action.payload.oldProduct.type &&
              data.region === action.payload.oldProduct.region) ||
            (data.minSp !== undefined &&
              data.minSp === action.payload.oldProduct.minSp &&
              data.maxSp === action.payload.oldProduct.maxSp)
            ? action.payload.newProduct
            : data
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        data: state.data.filter(
          (data) => data._id !== action.payload.oldProduct._id || (data.email !== undefined &&
            data.email !== action.payload.oldProduct.email)
        ),
      };
    case REMOVE_DATA:
      return {
        ...state,
        column: [],
        data: [],
        editable: {},
        actions: [],
      };
    default:
      return state;
  }
};

export default tableReducer;
