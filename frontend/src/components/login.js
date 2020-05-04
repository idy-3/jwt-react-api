import React, { useState } from "react";
import axiosInstance from "../axiosApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/token/obtain/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
