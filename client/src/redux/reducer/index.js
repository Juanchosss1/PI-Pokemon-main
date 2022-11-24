import {
  CLEAR_PAGE,
  // CREATE_POKEMON,
  GET_ALL_POKEMONS,
  GET_DETAILS,
  GET_TYPES,
  SORT_BY_NAME,
  SEARCH_BY_NAME,
  SORT_BY_STORAGE,
  SORT_BY_TYPE,
  SORT_BY_ATTACK,
  DELETE_POKEMON,
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
          ? allPokemonsFilteredDb.filter((e) => e.createDb)
          : action.payload === "inApi"
          ? allPokemonsFilteredDb.filter((e) => !e.createDb)
          : action.payload === "all" && allPokemonsFilteredDb;
      return {
        ...state,
        allPokemons: sortByStorage,
      };
    }
    case SORT_BY_TYPE: {
      const pokemonTypeFilter = state.allPokemonsFiltered;
      const typeFilter =
        action.payload === "none"
          ? pokemonTypeFilter
          : pokemonTypeFilter.filter(
              (t) =>
                t.types[0] === action.payload || t.types[1] === action.payload
            );
      return {
        ...state,
        allPokemons: typeFilter,
      };
    }

    case SORT_BY_ATTACK: {
      let sortByAttack =
        action.payload === "higher"
          ? state.allPokemons.sort(function (a, b) {
              return b.attack - a.attack;
            })
          : state.allPokemons.sort(function (a, b) {
              return a.attack - b.attack;
            });
      return {
        ...state,
        allPokemons: sortByAttack,
      };
    }

    case DELETE_POKEMON: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
