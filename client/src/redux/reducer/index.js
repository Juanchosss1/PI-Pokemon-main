import { GET_ALL_POKEMONS, SEARCH_BY_NAME } from "../actions/actionTypes";
const initialState = {
  allPokemons: [],
  pokemon: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        //pokemon: action.payload,
        allPokemons: action.payload,
      };
    case SEARCH_BY_NAME:{
      return{
        ...state,
        allPokemons: action.payload
      }
    }
    default:
      return state;
  }
}

export default rootReducer;
