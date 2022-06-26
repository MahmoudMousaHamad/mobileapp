import { APP_STATE_CHANGE } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
  const { type, state: _state } = action;
  switch (type) {
    case APP_STATE_CHANGE:
      return { ...state, state: action.state };
    default:
      return state;
  }
};
