import axios from "axios";
import secureStore from '../secureStore';

import config from '../config';

const register = (email, password) => {
  return axios.post(config.AUTH_API_URL + "signup", {
    email,
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
        await localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  secureStore.remove("user");
};

const setPushToken = (userId, pushToken) => {
  return axios
    .post(config.AUTH_API_URL + "setPushToken", {
      userId,
      pushToken,
    })
    .then(async (response) => {
      if (response.data.token) {
        await localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

export default {
  register,
  login,
  logout,
  setPushToken,
};