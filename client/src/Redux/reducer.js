import {
  GET_POKEMONS,
  SEARCH_POKEMON,
  GET_TYPES,
  GET_POKE_DETAILS,
  CREATE_POKEMON,
  FILTER_BY_TYPE,
  FILTER_BY_CREATOR,
  ORDER_ASC_NAME,
  ORDER_ASC_ATTACK,
  ORDER_DESC_NAME,
  ORDER_DESC_ATTACK,
  LOADING,
  RESET,
} from "./actions";

const initialState = {
  pokemons: [],
  searchedPoke: [],
  filteredPokemons: [],
  types: [],
  pokeDetail: {},
  createdPoke: null,
  orderBy: "Select",
  filterBy: "All",
  loading: false,
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS: {
      return {
        ...state,
        pokemons: state.pokemons.concat(action.payload),
      };
    }
    case SEARCH_POKEMON: {
      return {
        ...state,
        pokemons: [],
        searchedPoke: state.searchedPoke.concat(action.payload),
      };
    }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKE_DETAILS:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case CREATE_POKEMON: {
      return {
        ...state,
        createdPoke: action.payload,
      };
    }
    case FILTER_BY_TYPE:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonType,
        filterBy: action.payload.type,
      };

    case FILTER_BY_CREATOR:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonSource,
        filterBy: action.payload.source,
      };

    case ORDER_ASC_NAME:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonsOrder,
        orderBy: action.payload.name,
      };

    case ORDER_ASC_ATTACK:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonsOrder,
        orderBy: action.payload.name,
      };

    case ORDER_DESC_NAME:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonsOrder,
        orderBy: action.payload.name,
      };

    case ORDER_DESC_ATTACK:
      return {
        ...state,
        filteredPokemons: action.payload.pokemonsOrder,
        orderBy: action.payload.name,
      };
    case LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case RESET: {
      return {
        ...state,
        pokemons: [],
        searchedPoke: [],
        filteredPokemons: [],
        types: [],
      };
    }
    default:
      return state;
  }
}
