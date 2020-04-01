import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", state)
      .then(res => {
        console.log("RESPONSE: ", res);
        localStorage.setItem("token", res.data.payload);
        setState({
          username: "",
          password: ""
        });
        history.push("/protected");
      })
      .catch(err => console.log(err));
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className="login-form" onSubmit={login}>
        <input
          placeholder="username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
