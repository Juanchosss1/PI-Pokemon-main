import axios from "axios";
import { GET_ALL_POKEMONS } from "./actionTypes";

export function getAllPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: json.data,
    });
  };
}
