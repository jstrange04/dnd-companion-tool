import { useState } from "react";
import { AuthService } from "../../services";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import { AuthContext } from "../../contexts";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = AuthContext.useLogin();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const Login = async (email: string, password: string) => {
    const response = await AuthService.authenticate(email, password);
    if (response.status === 200) {
      const authDetails = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("user", JSON.stringify(authDetails));

      dispatch({
        type: "authentication",
        ...authDetails,
      });
      navigate(NavigationRoutes.Home);
    }
    return response.data;
  };

  const handleLogin = () => {
    try {
      console.log(email + " " + password);
      Login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
    navigate(NavigationRoutes.Register);
  };

  return (
    <div className="box">
      <header>The Companion Tool</header>
      <div className="box">
        <div className="email">
          <input
            placeholder="Enter Email Address"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <input
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <text onClick={handleRegister}>register here</text>
        </div>
      </div>
    </div>
  );
};

export default Login;
