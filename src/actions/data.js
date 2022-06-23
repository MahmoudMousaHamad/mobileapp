import { GOT_DATA, SEND_DATA } from "./types";

export const gotData = (data, name) => ({
  type: GOT_DATA,
  [name]: data,
  name,
});

export const sendData = (channel, data) => ({
  type: SEND_DATA,
  payload: data,
  channel,
});
