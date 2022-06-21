import axios from "axios";
import authHeader from "./auth-header";

import config from '../config';

const getUser = () => {
  return axios.get(config.AUTH_API_URL + "me", { headers: authHeader() });
};

export default {
  getUser,
};