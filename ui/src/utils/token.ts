import jwtDecode from "jwt-decode";

const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    return user?.accessToken;
  };

  const getJWT = (): any => jwtDecode(getAccessToken());

  const TokenUtils = {
    getAccessToken,
    getJWT
  };
  
  export default TokenUtils;