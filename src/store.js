import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import socketIOClient from "socket.io-client";

import * as Actions from "./actions/data";
import reducer from "./reducers";
import config from "./config";
import { SOCKET_SEND_DATA } from "./actions/types";

let socket;

const SocketMiddleware = (store) => (next) => (action) => {
  console.log(action);
  if (socket) {
    switch (action.type) {
      case SOCKET_SEND_DATA:
        console.log(
          "Sending data over socket channel.",
          "Channel:",
          action.channel,
          "Payload:",
          action.payload
        );
        socket.emit(action.channel, action.payload);
        break;
      default:
        break;
    }
  } else {
    throw Error("Socket is null");
  }

  return next(action);
};

const StartSocket = (store) => {
  socket = socketIOClient(config.SERVER_ENDPOINT);

  socket.on("handshake", () => console.log("Socket connection established."));

  console.log("Sending user to server.");
  store.dispatch(Actions.sendData("user", store.getState().auth.user));

  ["question"].forEach((channel) => {
    socket.on(channel, (data) => {
      store.dispatch(Actions.gotData(data, channel));
    });
  });
};

const store = createStore(reducer, applyMiddleware(SocketMiddleware, thunk));

// Set up socket
StartSocket(store);

export default store;


// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default configureStore(
//   { reducer },
//   composeEnhancers(
//       applyMiddleware(...middleware)
//   )
// );