import {
  CLEAR_PAGE,
  CREATE_POKEMON,
  GET_ALL_POKEMONS,
  GET_DETAILS,
  GET_TYPES,
  SORT_BY_NAME,
  SEARCH_BY_NAME,
  SORT_BY_STORAGE,
  SORT_BY_TYPE,
} from "../actions/actionTypes";
const initialState = {
  allPokemons: [],
  allPokemonsFiltered: [],
  pokemon: [],
  pokemonDetails: {},
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemonsFiltered: action.payload,
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
    case GET_TYPES: {
      return {
        ...state,
        types: action.payload,
      };
    }

    case SORT_BY_NAME: {
      let sortByName =
        action.payload === "asc"
          ? state.allPokemons.sort((a, b) => a.name.localeCompare(b.name))
          : state.allPokemons.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        allPokemons: sortByName,
      };
    }

    case SORT_BY_STORAGE: {
      let allPokemonsFilteredDb = state.allPokemonsFiltered;

      const sortByStorage =
        action.payload === "inDb"
          ? state.allPokemonsFiltered.filter((e) => e.createDb)
          : state.allPokemonsFiltered.filter((e) => !e.createDb);
      return {
        ...state,
        allPokemons:
          action.payload === "all" ? allPokemonsFilteredDb : sortByStorage,
      };
    }
    case SORT_BY_TYPE: {
      const sortByType = state.allPokemonsFiltered.filter((e) =>
        e.includes(action.payload)
      );
      return {
        ...state,
        allPokemons: sortByType,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
