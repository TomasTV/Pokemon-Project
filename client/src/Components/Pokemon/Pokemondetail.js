import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpokeDetail, resetAll } from "../../Redux/actions";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Pokemondetail({ id }) {
  const dispatch = useDispatch();
  const pokeDetail = useSelector((store) => store.pokeDetail);

  useEffect(() => {
    dispatch(getpokeDetail(id));
    dispatch(resetAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className="section section-center">
        <section className="pokes-container">
          <h3>{pokeDetail.name}</h3>
          <img className="img" src={pokeDetail.image} alt={"Available Soon!"} />
          {pokeDetail.type ? (
            <h5 className="title">Types: {pokeDetail.type}</h5>
          ) : (
            <h5 className="title">
              Types:
              {pokeDetail.types && pokeDetail.types.map((t) => t.name)}
            </h5>
          )}
          <h5 className="title">Hp: {pokeDetail.hp}</h5>
          <h5 className="title">Attack: {pokeDetail.attack}</h5>
          <h5 className="title">Defense: {pokeDetail.defense}</h5>
          <h5 className="title">Speed: {pokeDetail.speed}</h5>
          <h5 className="title">Height: {pokeDetail.height}</h5>
          <h5 className="title">Weight: {pokeDetail.weight}</h5>
          {pokeDetail.pokeId ? (
            <h5 className="title">Id: {pokeDetail.pokeId}</h5>
          ) : (
            <h5 className="title">Id: {pokeDetail.id}</h5>
          )}
          <Link to="/home">
            <button className="btn">Go Back</button>
          </Link>
        </section>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
 margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 12rem;
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 60rem;
  article {
    border: 1px solid var(--clr-neutral-100);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 50%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
  }
  img {
    height: 275px;
  }

  .pokes-container {
    --clr-neutral-100: hsl(0, 0%, 100%);
    --clr-neutral-1000: hsla(250, 55%, 4%, 0.849);
    display: grid;
    padding: 2rem 3.5rem;
    box-shadow: var(--light-shadow);
    border-style: solid;
    border-radius: 1rem;
    background-color: var( --clr-neutral-1000);
    border-color: var(--clr-neutral-100);
    gap: 2rem 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: absolute;
    top: 0;
    bottom: 0;
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

export default Pokemondetail;
