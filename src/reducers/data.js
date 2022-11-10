import { CLEAR_DATA, GOT_DATA } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
  const { type, name } = action;
  switch (type) {
    case GOT_DATA:
      return { ...state, [name]: action[name] };
    case CLEAR_DATA:
      console.log("Clearning data with name", name);
      return { ...state, [name]: null};
    default:
      return state;
  }
};
