import axios from "axios";
import { stringify } from "qs";
import { getToken } from "../utils/localStorage";

const API_ENDPOINT = "";

const AxiosClient = axios.create({
  baseURL: API_ENDPOINT,
  responseType: "json",
  timeout: 50000,
  paramsSerializer: (params) => stringify(params, { arrayFormat: "repeat" }),
});

AxiosClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    if (getToken()) {
      newConfig.headers.Authorization = `Bearer ${getToken()}`;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
