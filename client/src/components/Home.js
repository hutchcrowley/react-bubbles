import React from "react";
import Login from "./Login";

import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav className="app-nav">
        <div className="login-nav">
          <Login />
        </div>
        <div className="links">
          <NavLink to="/protected">BubblePage</NavLink>
          <NavLink to="/">Home</NavLink>
        </div>
      </nav>
      <div className="hero">
        <h1>Welcome to the Bubble App!</h1>
      </div>
    </>
  );
};

export default Home;
