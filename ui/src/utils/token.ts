import jwtDecode from "jwt-decode";

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.accessToken;
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user?.refreshToken;
};

const getJWT = (): any => jwtDecode(getAccessToken());

const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenUtils = {
  getAccessToken,
  getRefreshToken,
  getJWT,
  setUser,
  removeUser
};

export default TokenUtils;
