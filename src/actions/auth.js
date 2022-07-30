import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    PUSH_TOEKN_SET,
  } from "./types";
import AuthService from "../services/auth";

export const register = (email, firstName, lastName, password) => (dispatch) => {
    return AuthService.register(email, firstName, lastName, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const me = () => (dispatch) => {
  return AuthService.me().then(console.log).catch(console.log);
}

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        console.log(message);
        return Promise.reject();
      }
    );
  };
export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };


export const setPushToken = (userId, pushToken) => (dispatch) => {
  return AuthService.setPushToken(userId, pushToken).then(
    (data) => {
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
}