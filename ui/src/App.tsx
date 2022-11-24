import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const login = async (email: string, password: string) => {
    return await instance
      .post("/auth", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response.data);
        }
        email = '';
        password = '';
        //window.location.reload();
        setUser(response.data);
        return response.data;
      });
  };

  const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogin = async () => {
    try {
      login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div>
        <input placeholder='Enter Email Address' value={email} onChange={handleEmailChange}></input>
        <input placeholder='Enter Password' value={password} onChange={handlePasswordChange}></input>
        <button type='submit' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
