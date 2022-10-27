import { GET_ALL_POKEMONS } from "../actions/actionTypes";
const initialState = {
  allPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
