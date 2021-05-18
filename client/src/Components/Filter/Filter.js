import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getTypes,
  filterByType,
  filterByCreator,
  orderAsc,
  orderDesc,
} from "../../Redux/actions";

function Filter() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);

  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (e) => {
    dispatch(filterByType(e.target.value));
  };

  //Filter by Creator
  const handleCreator = (e) => {
    console.log(e.target.value);
    dispatch(filterByCreator(e.target.value));
  };

  //Order
  const handleOrder = (e) => {
    console.log(e.target.value);
    if (e.target.value === "asc_name" || e.target.value === "asc_attack") {
      dispatch(orderAsc(e.target.value));
    } else {
      dispatch(orderDesc(e.target.value));
    }
  };

  return (
    <Wrapper>
      <form className="form-control">
        <div>
          <p className="title-filter">Filter by Type</p>
          <select className="search-input" onChange={(e) => handleFilter(e)}>
            <option default>All</option>
            {types.map((t) => (
              <option key={t.typeId} value={t.name}>
                {t.name}
              </option> //Console logear types!!
            ))}
          </select>
        </div>
        <div>
          <p className="title-filter">Filter by Creator</p>
          <select className="search-input" onChange={(e) => handleCreator(e)}>
            <option default>All</option>
            <option value="Api">Api Pokemons</option>
            <option value="Created">Created Pokemons</option>
          </select>
        </div>
        <div>
          <p className="title-filter">Order</p>
          <select className="search-input" onChange={(e) => handleOrder(e)}>
            <option default>Select</option>
            <option value="asc_name">Alphabetically (A-Z)</option>
            <option value="desc_name">Alphabetically (Z-A)</option>
            <option value="asc_attack">Attack (Lower-Higher)</option>
            <option value="desc_attack">Attack (Higher-Lower)</option>
          </select>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-control {
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-around;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.4rem;
    background: var(--clr-grey-10);
    justify-content: space-between;
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filter;
