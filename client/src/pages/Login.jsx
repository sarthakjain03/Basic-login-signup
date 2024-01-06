import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../actions/apicalls";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      if(data)
        history('/home', {state: {id: data.email, name: data.name, email: data.email, gender: data.gender, phone: data.phone}})

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Login</h1>
      <form
        action="POST"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          placeholder="Email Id"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "20px 0" }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "0 0 20px" }}
        />
        <button type="submit" onClick={handleSubmit} style={{padding: '10px'}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
