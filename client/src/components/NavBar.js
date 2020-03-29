import React from "react";
import Login from "./Login";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="app-nav">
      <div className="login-nav">
        <Login />
      </div>
      <div className="links">
        <NavLink to="/protected" className="nav-link">
          BubblePage
        </NavLink>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
