import axios from "axios";
import secureStore from '../secureStore';

import config from '../config';
import authHeader from "./auth-header";

const register = (email, firstName, lastName, password) => {
  return axios.post(config.AUTH_API_URL + "signup", {
    email,
    firstName, 
    lastName,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(config.AUTH_API_URL + "signin", {
      email,
      password,
    })
    .then(async (response) => {
      if (response.data.token) {
        await secureStore.set("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = async () => {
  await secureStore.remove("user");
};

const setPushToken = (userId, pushToken) => {
  return axios
    .post(config.AUTH_API_URL + "setPushToken", {
      userId,
      pushToken,
    })
    .then(async (response) => {
      if (response.data.token) {
        await secureStore.set("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

const me = async () => {
  const headers = await authHeader();
  console.log("HEADERS: ", headers);
  return axios.get(config.AUTH_API_URL + "me", { headers });
};

export default {
  register,
  login,
  logout,
  me,
  setPushToken,
};