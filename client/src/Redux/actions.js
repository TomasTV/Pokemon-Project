import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const GET_POKE_DETAILS = "GET_POKE_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR";
export const ORDER_ASC_NAME = "ORDER_ASC_NAME";
export const ORDER_ASC_ATTACK = "ORDER_ASC_ATTACK";
export const ORDER_DESC_NAME = "ORDER_DESC_NAME";
export const ORDER_DESC_ATTACK = "ORDER_DESC_ATTACK";
export const RESET = "RESET";
export const LOADING = "LOADING";

export const getPokemons = () => async (dispatch) => {
  dispatch({ type: LOADING });
  return axios.get("http://localhost:3001/").then(async (pokemon) => {
    console.log(pokemon);
    await dispatch({
      type: GET_POKEMONS,
      payload: pokemon.data,
    });
    dispatch({ type: LOADING });
  });
};

export const searchPokemon = (name) => async (dispatch) => {
  dispatch({ type: LOADING });
  return await axios
    .get(`http://localhost:3001/pokemons?name=${name}`)
    .then((pokemon) => {
      dispatch({
        type: SEARCH_POKEMON,
        payload: pokemon.data,
      });
      dispatch({ type: LOADING });
    });
};

export const getpokeDetail = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  return await axios.get(`http://localhost:3001/${id}`).then((pokemon) => {
    dispatch({
      type: GET_POKE_DETAILS,
      payload: pokemon.data,
    });
    dispatch({ type: LOADING });
  });
};

export const getTypes = () => async (dispatch) => {
  return await axios.get(`http://localhost:3001/types/types`).then((res) => {
    dispatch({
      type: GET_TYPES,
      payload: res.data,
    });
    // console.log(res.data);
  });
};

export const createPokemon = (poke) => async (dispatch) => {
  return await axios
    .post("http://localhost:3001/pokemons/pokemons", poke)
    .then((res) => {
      console.log(res);
      dispatch({
        type: CREATE_POKEMON,
        payload: res.data,
      });
    });
};

export const filterByType = (type) => (dispatch, getState) => {
  let filteredPokemons = [];

  if (type === "All") {
    filteredPokemons = getState().pokemons;
  } else {
    filteredPokemons = getState().pokemons.filter((poke) =>
      (poke.type || []).includes(type)
    );
  }
  dispatch({
    type: FILTER_BY_TYPE,
    payload: {
      type,
      pokemonType: filteredPokemons,
    },
  });
};

export const filterByCreator = (source) => (dispatch, getState) => {
  if (source === "All") {
    const allPokemons = getState().pokemons;
    dispatch({
      type: FILTER_BY_CREATOR,
      payload: {
        source,
        pokemonSource: allPokemons,
      },
    });
  } else {
    const pokemonSource = getState().pokemons.filter(function (p) {
      return p.source === source;
    });
    dispatch({
      type: FILTER_BY_CREATOR,
      payload: {
        pokemonSource,
        source,
      },
    });
  }
};

export const orderAsc = (type) => (dispatch, getState) => {
  const filterBy = getState().filterBy;
  const pokemons = getState().pokemons;
  const filtered = getState().filteredPokemons;

  if (filterBy === "All") {
    if (type === "asc_attack") {
      const pokemonsOrder = pokemons.sort((a, b) => a.attack - b.attack);
      dispatch({
        type: ORDER_ASC_ATTACK,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
    if (type === "asc_name") {
      const pokemonsOrder = pokemons.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_ASC_NAME,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
  } else {
    if (type === "asc_attack") {
      const pokemonsOrder = filtered.sort((a, b) => a.attack - b.attack);
      dispatch({
        type: ORDER_ASC_ATTACK,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
    if (type === "asc_name") {
      const pokemonsOrder = filtered.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
      });
      dispatch({
        type: ORDER_ASC_NAME,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
  }
};

export const orderDesc = (type) => (dispatch, getState) => {
  const filterBy = getState().filterBy;
  const pokemons = getState().pokemons;
  const filtered = getState().filteredPokemons;

  if (filterBy === "All") {
    if (type === "desc_attack") {
      const pokemonsOrder = pokemons.sort((a, b) => b.attack - a.attack);
      dispatch({
        type: ORDER_DESC_ATTACK,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
    if (type === "desc_name") {
      const pokemonsOrder = pokemons.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;

        return 0;
      });
      dispatch({
        type: ORDER_DESC_NAME,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
  } else {
    if (type === "asc_attack") {
      const pokemonsOrder = filtered.sort((a, b) => b.attack - a.attack);
      dispatch({
        type: ORDER_ASC_ATTACK,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
    if (type === "desc_name") {
      const pokemonsOrder = filtered.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      dispatch({
        type: ORDER_DESC_NAME,
        payload: {
          pokemonsOrder,
          name: type,
        },
      });
    }
  }
};

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: RESET,
    });
  };
};
