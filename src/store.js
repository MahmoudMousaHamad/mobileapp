import { applyMiddleware, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import socketIOClient from "socket.io-client";

import * as Actions from "./actions/data";
import reducer from "./reducers";
import config from "./config";
import { SOCKET_SEND_DATA } from "./actions/types";
import secureStore from "./secureStore";

let socket;

const SocketMiddleware = (store) => (next) => (action) => {
  const { channel, payload } = action;
  if (socket) {
    switch (action.type) {
      case SOCKET_SEND_DATA:
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
        break;
      default:
        break;
    }
  } else {
    throw Error("Socket is null");
  }

  return next(action);
};

const startSocket = async (store) => {
  socket = socketIOClient(config.SERVER_ENDPOINT);

  socket.emit('source', 'mobile');
  
  const user = await secureStore.get('user');
  store.dispatch(Actions.sendData("user", user));

  ["question"].forEach((channel) => {
    socket.on(channel, (data) => {
      store.dispatch(Actions.gotData(data, channel));
    });
  });
};

const store = createStore(reducer, applyMiddleware(SocketMiddleware, thunk));

startSocket(store);

export default store;


// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default configureStore(
//   { reducer },
//   composeEnhancers(
//       applyMiddleware(...middleware)
//   )
// );