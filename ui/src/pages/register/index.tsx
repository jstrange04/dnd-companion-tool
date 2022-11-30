import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserService } from "../../services";
import NavigationRoutes from "../../constants/routes"
import { AuthContext } from "../../contexts";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = AuthContext.useLogin();

  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const Register = async (email: string, username: string, password: string) => {
    debugger;
    const response = await UserService.createUser(email, username, password);
    if (response.status === 201) {
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
  }

  const handleRegister = () => {
    try {
      console.log(email + " " + username + " " + password);
      Register(email, username, password);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <header>Register Page</header>
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
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
          <input
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
