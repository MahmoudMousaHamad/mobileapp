import { GOT_DATA, SOCKET_SEND_DATA, CLEAR_DATA } from "./types";

export const gotData = (data, name) => ({
  type: GOT_DATA,
  [name]: data,
  name,
});

export const sendData = (channel, data) => ({
  type: SOCKET_SEND_DATA,
  payload: data,
  channel,
});

export const clearData = (name) => ({
  type: CLEAR_DATA,
  [name]: null,
});