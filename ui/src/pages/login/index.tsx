import { useState } from "react";
import { AuthService } from "../../services";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import { AuthContext } from "../../contexts";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
      <Box
        sx={{
          height: 25,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".2rem",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <p>Login</p>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          sx={{
            height: 10,
            width: 250,
            fontFamily: "monospace",
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          sx={{
            height: 10,
            width: 250,
            fontFamily: "monospace",
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </Box>
      <Box
        sx={{
          height: 50,
          fontWeight: 300,
          marginLeft: 10,
        }}
      >
        <p onClick={handleRegister}>Register</p>
      </Box>
    </div>
  );
};

export default Login;
