import { APP_STATE_CHANGE } from "./types";

export const appStateChanged = (newState) => {
  return {
    type: APP_STATE_CHANGE,
    state: newState,
  }
};
