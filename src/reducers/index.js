import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import data from "./data";
import appState from "./appState";

export default combineReducers({
  auth,
  message,
  data,
  appState,
});