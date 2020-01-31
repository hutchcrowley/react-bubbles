import React from "react";

import Login from "./Login";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="app-nav">
      <div className="login-nav">
        <Login />
      </div>
      <div className="links">
        <NavLink to="/protected">Friends</NavLink>
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  );
};

export default Header;
