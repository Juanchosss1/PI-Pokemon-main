import axios from "axios";
import {
  GET_ALL_POKEMONS,
  SEARCH_BY_NAME,
  GET_DETAILS,
  CREATE_POKEMON,
} from "./actionTypes";

export function getAllPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: json.data,
    });
  };
}

export function searchPokemon(value) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${value}`);
      let arr = [];
      arr.push(json.data);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: arr,
      });
    } catch (err) {
      window.alert(err.response.data);
    }
  };
}

export function getDetails(value) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${value}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (err) {}
  };
}

export function clearPage() {
  return {
    type: "CLEAR_PAGE",
  };
}

export function createPokemon(payload) {
  return async function (dispatch) {
    try {
      await axios
        .post(`http://localhost:3001/pokemons`, payload)
        .then((json) => dispatch({ type: CREATE_POKEMON, payload: json }));
    } catch (err) {
      window.alert(err.response.data);
    }
  };
}
