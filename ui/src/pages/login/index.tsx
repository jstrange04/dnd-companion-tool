import axios from "axios";
import { useState } from "react";
import { AuthService } from "../../services"
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  // const instance = axios.create({
  //   baseURL: "http://localhost:3001/",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const login = async (email: string, password: string) => {
  //   return await instance
  //     .post("/auth", { email, password })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         const user = jwt_decode(response.data.accessToken);
  //         console.log(user);
  //         setUser(user);
  //       }
  //       email = '';
  //       password = '';
  //       window.location.reload();
  //       return response.data;
  //     });
  // };
  const navigate = useNavigate();

  const Login = async (email: string, password: string) => {
    
    debugger;
    const response = await AuthService.authenticate(email, password);
    if (response.status === 200) {
      const user = jwt_decode(response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      navigate(NavigationRoutes.Home);
    }
    return response.data;
  }

  // const setUser = (user: any) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // };

  const handleLogin = () => {
    try {
      console.log(email + ' ' + password);
      Login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <div>
      <input placeholder='Enter Email Address' value={email} onChange={handleEmailChange}></input>
      <input placeholder='Enter Password' value={password} onChange={handlePasswordChange}></input>
      <button type='submit' onClick={handleLogin}>Login</button>
    </div>
);
}

export default Login;
