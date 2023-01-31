import axios from "axios";
import TokenUtils from "../utils/token";
import NavigationRoutes from "../constants/routes";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenUtils.getAccessToken();
    if (token && config.headers && config.url !== "/auth/refresh") {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;
    console.log("org,:", originalConfig);

    if (err.response && err.response.status === 401) {
      const refreshToken = TokenUtils.getRefreshToken();

      // this should check if the URL is not the auth or refresh
      // and if the refresh token exists it should try get a new access token
      if (
        (originalConfig.url !== "/auth/refresh" || originalConfig.url !== "/auth") 
        && refreshToken
      ) {
        try {
          debugger;
          const rs = await instance.post("/auth/refresh", {
            refreshToken: refreshToken,
          });

          console.log("response", rs);
          debugger;
          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);

          TokenUtils.setUser(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          //handle logout
          TokenUtils.removeUser();
          window.location.href = NavigationRoutes.Login;

          console.log("remove refresh token expired");
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
