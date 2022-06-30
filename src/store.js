import { applyMiddleware, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import socketIOClient from "socket.io-client";

import * as Actions from "./actions/data";
import reducer from "./reducers";
import config from "./config";
import { LOGIN_SUCCESS, LOGOUT, SOCKET_SEND_DATA } from "./actions/types";
import secureStore from "./secureStore";
import Socket from './Socket';

let socket;

const SocketMiddleware = (store) => (next) => (action) => {
  const { channel, payload } = action;
    switch (action.type) {
      case SOCKET_SEND_DATA:
        if (socket) {
          console.log(
            "Sending data over socket channel.",
            "Channel:",
            channel,
            "Payload:",
            payload
          );
          if (payload || payload === false || payload === 0) {
            socket.emit(channel, payload);
          } else {
            throw new Error("Not sending to server because payload is null or undefined...", payload);
          }
        } else {
          console.log("Socket is null");
        }
        break;
      case LOGIN_SUCCESS:
        console.log("Setting up socket.");
        socket = Socket.connect(config.SERVER_ENDPOINT, store);
        break;
     case LOGOUT:
        if (socket) {
          socket.disconnect();
        }
        break;
      default:
        break;
    }

  return next(action);
};


const store = createStore(reducer, applyMiddleware(SocketMiddleware, thunk));

if (store.getState().auth.isLoggedIn) {
  socket = Socket.connect(config.SERVER_ENDPOINT, store);
}

export default store;


// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default configureStore(
//   { reducer },
//   composeEnhancers(
//       applyMiddleware(...middleware)
//   )
// );