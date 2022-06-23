import { GOT_DATA } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
  const { type, name } = action;
  switch (type) {
    case GOT_DATA:
      return { [name]: action[name], ...state };
    default:
      return state;
  }
};
