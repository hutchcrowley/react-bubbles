import React from "react";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div className="home-wrapper">
      <NavBar />
      <div className="hero">
        <h1>Welcome to the Bubble App!</h1>
      </div>
      <div className="home-image">
        <img src={require("../Assets/trianglify-lowres.png")} alt="new" />
      </div>
    </div>
  );
};

export default Home;
