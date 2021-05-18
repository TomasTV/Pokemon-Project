import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon, getTypes } from "../../Redux/actions";
import { Link } from "react-router-dom";
import logo from "../../assets/pokebola.svg";
import "./form.css";

function Form() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);

  const [state, setState] = useState({
    name: "",
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
  });

  const ChangeInput = (e) => {
    const target = e.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log([name, value]);
    // console.log(target.value);
    if (name === "types") {
      const arr = state[name];
      // console.log(arr);
      setState({
        ...state,
        [name]: arr.concat(target.value),
      });
      // console.log(state[name]);
    } else {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const poke = {
      name: state.name,
      hp: state.hp,
      attack: state.attack,
      defense: state.defense,
      speed: state.speed,
      height: state.height,
      weight: state.weight,
      typeId: state.types[0],
      typeId2: state.types[1],
    };

    if (!poke.name) {
      alert("Please, enter a name");
      return;
    }
    if (!poke.hp) {
      alert("Please, give some health to your poke!");
      return;
    }
    if (!poke.attack) {
      alert("Please, give some attack to your poke!");
      return;
    }
    if (!poke.defense) {
      alert("Please, give some defense to your poke!");
      return;
    }
    if (!poke.speed) {
      alert("Please, give some speed to your poke!");
      return;
    }
    if (!poke.height) {
      alert("Please, give some height to your poke!");
      return;
    }
    if (!poke.weight) {
      alert("Please, give some weight to your poke!");
      return;
    }
    if (!poke.typeId) {
      alert("Dont forget to add a type to your poke!");
      return;
    }

    dispatch(createPokemon(poke));
    e.target.reset();
    // console.log(poke);
    alert("Pokemon created successfully!");

    setState({
      name: "",
      hp: null,
      attack: null,
      defense: null,
      speed: null,
      height: null,
      weight: null,
      types: [],
    });
  };

  return (
    <>
      <Link to="/home">
        <img className="pokebola" src={logo} alt="Pokebole" />
      </Link>
      <div className="containerForm">
        <header>
          <h1 id="title">Create your pokemon!</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">Name</label>
              <input
                className="btm"
                type="text"
                name="name"
                value={state.name}
              ></input>
            </div>
            <div>
              <label className="text-label">Hp</label>
              <input
                className="btm"
                type="number"
                name="hp"
                value={state.hp}
              ></input>
            </div>
            <div>
              <label className="text-label">Attack</label>
              <input
                className="btm"
                type="number"
                name="attack"
                value={state.attack}
              ></input>
            </div>
            <div>
              <label className="text-label">Defense</label>
              <input
                className="btm"
                type="number"
                name="defense"
                value={state.defense}
              ></input>
            </div>
            <div>
              <label className="text-label">Speed</label>
              <input
                className="btm"
                type="number"
                name="speed"
                value={state.speed}
              ></input>
            </div>
            <div>
              <label className="text-label">Height</label>
              <input
                className="btm"
                type="number"
                name="height"
                value={state.height}
              ></input>
            </div>
            <div>
              <label className="text-label">Weight</label>
              <input
                className="btm"
                type="number"
                name="weight"
                value={state.weight}
              ></input>
            </div>
            <div>
              <label className="text-label">Types</label>
              <div className="divGen">
                <ul className="ultypes">
                  {types.map((t) => (
                    <li key={t.typeId}>
                      <input
                        className="input"
                        type="checkbox"
                        name="types"
                        value={t.name}
                      ></input>
                      <label name={t}>{t.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="submitForm" type="submit">
                Create Pokemon
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
