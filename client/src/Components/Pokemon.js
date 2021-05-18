import React from "react";
import { Link } from "react-router-dom";
import "./styles/pokestyles.css";

export default function Pokemon({ id, name, type, image }) {
  return (
    <div className="card">
      <h3 className="title">{name}</h3>
      <div>
        <img src={image} alt={name} />
      </div>
      <h5 className="title">Types: {type}</h5>
      <Link to={`/pokemon/${id}`}>
        <button className="btn-sm" type="submit">
          Read More
        </button>
      </Link>
    </div>
  );
}
