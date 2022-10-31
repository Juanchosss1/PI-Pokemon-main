import {
  CLEAR_PAGE,
  CREATE_POKEMON,
  GET_ALL_POKEMONS,
  GET_DETAILS,
  SEARCH_BY_NAME,
} from "../actions/actionTypes";
const initialState = {
  allPokemons: [],
  pokemon: [],
  pokemonDetails: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        //pokemon: action.payload,
        allPokemons: action.payload,
      };
    case SEARCH_BY_NAME: {
      return {
        ...state,
        allPokemons: action.payload,
      };
    }
    case GET_DETAILS: {
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    }
    case CLEAR_PAGE: {
      return {
        ...state,
        pokemonDetails: {},
      };
    }
    case CREATE_POKEMON: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
