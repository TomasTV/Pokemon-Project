import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="section section-center">
      <h2>Henry Pokemons</h2>
      <Link to="/home">
        <button className="btn">Start</button>
      </Link>
    </div>
  );
};

export default Landing;
