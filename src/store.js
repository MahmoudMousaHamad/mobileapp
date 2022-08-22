import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";
import config from "./config";
import { LOGIN_SUCCESS, LOGOUT, ME, SOCKET_SEND_DATA } from "./actions/types";
import Socket from './Socket';
import { getUser } from "./Utils";

const SocketMiddleware = (store) => (next) => (action) => {
  const { channel, payload } = action;
    switch (action.type) {
      case SOCKET_SEND_DATA:
        if (Socket.isConnected) {
          if (payload || payload === false || payload === 0) {
            Socket.socket.emit(channel, payload);
          } else {
            Socket.socket.emit(channel);
          }
        } else {
          console.log("Socket is null/not connected");
        }
        break;
      case LOGIN_SUCCESS:
        console.log("Setting up socket.");
        Socket.connect(config.SERVER_ENDPOINT, store);
        break;
     case LOGOUT:
        console.log("Socket is disconnecting");
        if (Socket.isConnected) {
          Socket.disconnect();
        }
        break;
      default:
        break;
    }

  return next(action);
};

const store = createStore(reducer, applyMiddleware(SocketMiddleware, thunk));

store.dispatch(async (dispatch) => {
  const user =  await getUser();
  if (user) {
    dispatch({ type: ME, payload: user });
    if (!Socket.isConnected) {
      Socket.connect(config.SERVER_ENDPOINT, store);
    }
  }
});

export default store;


// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default configureStore(
//   { reducer },
//   composeEnhancers(
//       applyMiddleware(...middleware)
//   )
// );