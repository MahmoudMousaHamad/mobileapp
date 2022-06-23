import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import data from "./data";

export default combineReducers({
  auth,
  message,
  data
});