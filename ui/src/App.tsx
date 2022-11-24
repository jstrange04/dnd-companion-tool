import React, { useState } from 'react';
import './App.css';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <input placeholder='Enter Email Address' value={email} onChange={handleEmailChange}></input>
        <input placeholder='Enter Password' value={password} onChange={handlePasswordChange}></input>
        <button type='submit'>Login</button>
      </div>
    </div>
  );
}

export default App;
