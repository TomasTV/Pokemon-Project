import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAll, searchPokemon } from "../Redux/actions";
import Searchedpoke from "../Components/Searchedpoke/Searchedpoke";
import { v4 as uuidv4 } from "uuid";

function Searchbar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const searchedPoke = useSelector((state) => state.searchedPoke);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    dispatch(searchPokemon(name));
    dispatch(resetAll());
  };

  return (
    <>
      <form className="nav-header" onSubmit={handleSubmit}>
        <input
          className="search-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Search Pokemon..."
        ></input>
        <button className="btn">Search</button>
        <article>
          <div>
            <section>
              {searchedPoke.map((data) => {
                return <Searchedpoke key={uuidv4()} {...data} />;
              })}
            </section>
          </div>
        </article>
      </form>
    </>
  );
}

export default Searchbar;
