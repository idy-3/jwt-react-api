import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosApi";

const Hello = () => {
  const [message, setMessage] = useState("");

  const getMessage = () => {
    axiosInstance
      .get("/hello/")
      .then((response) => {
        const msg = response.data.hello;
        console.log(response.data.user);
        const username = response.data.user.username;
        setMessage(msg + " " + username);
        return msg;
      })
      .catch((error) => {
        console.log("Hello Error: ", JSON.stringify(error, null, 4));
        // throw error;
      });
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Hello;
