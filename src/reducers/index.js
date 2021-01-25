import { combineReducers } from "redux";
import alert from "./alert";
import table from "./table";

export default combineReducers({
  alert: alert,
  table: table,
});
