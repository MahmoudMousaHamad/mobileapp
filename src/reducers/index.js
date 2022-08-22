import { combineReducers } from "redux";
import appState from "./appState";
import message from "./message";
import auth from "./auth";
import data from "./data";

export default combineReducers({
  auth,
  message,
  data,
  appState,
});
