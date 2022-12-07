import axios from "axios";
import TokenUtils from "../utils/token"

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = TokenUtils.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default instance