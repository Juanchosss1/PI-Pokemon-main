import axios from "axios";
import { GET_ALL_POKEMONS, SEARCH_BY_NAME } from "./actionTypes";

export function getAllPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: json.data,
    });
  };
}

export function searchPokemon(value){
  return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/pokemons/${value}`);
    let arr=[]
    arr.push(json.data)
    return dispatch({
      type: SEARCH_BY_NAME,
      payload: arr,
  })
}
}