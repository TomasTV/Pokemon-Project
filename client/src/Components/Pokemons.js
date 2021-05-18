import React from "react";
// import Error from "./Error";
import Pokemon from "./Pokemon";
import { v4 as uuidv4 } from "uuid";

export default function Pokemons({ pokes }) {
  return (
    <div className="pokemons">
      <div className="poke">
        <section>
          {pokes && pokes.map((data) => <Pokemon key={uuidv4()} {...data} />)}
        </section>
      </div>
    </div>
  );
}
