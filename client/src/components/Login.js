import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    e.persist();
    console.log("login credentials: ", state);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

  const login = () => {
    axios
      .post("http://localhost:5000/api/login", state)
      .then((res) => {
        console.log("RESPONSE: ", res);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch((err) => console.log(err));
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className="login-form" onSubmit={login}>
        <label>
          <input
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
