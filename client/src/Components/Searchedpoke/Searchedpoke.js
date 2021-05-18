import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Searchedpoke({ id, name, type, image }) {
  return (
    <Wrapper>
      <div className="pokes-container">
        <h3 className="title-detail">{name}</h3>
        <div className="searched-card">
          <img className="img" src={image} alt={name} />
        </div>
        <h5 className="title-detail">Types: {type}</h5>
        <Link to={`/pokemon/${id}`}>
          <button className="btn-sm" type="submit">
            Read More
          </button>
        </Link>
      </div>
    </Wrapper>
  );
}

export default Searchedpoke;

const Wrapper = styled.section`

.searched-card {
  text-align: center;
}

  img {
    margin-top: 3rem;
    width: 100% !important;
    height: 12rem !important;
  }

  .pokes-container {
    --clr-neutral-100: hsl(0, 0%, 100%);
    --clr-neutral-1000: hsla(250, 55%, 4%, 0.849);
    display: grid;
    max-width: 30rem;
    padding: 1rem 1rem 0 3rem;
    box-shadow: var(--light-shadow);
    border-style: solid;
    border-radius: 1rem;
    background-color: var( --clr-neutral-1000);
    border-color: var(--clr-neutral-100);
    margin-top: 15rem;
    margin-bottom: 5rem;
    position: absolute;
    top: 0;
    left: 27rem;
    bottom: 1.5rem;
  }

  @media (min-width: 992px) {
    .pokes-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .pokes-container {
      grid-template-columns: repeat(3, 1fr);
    }
`;
