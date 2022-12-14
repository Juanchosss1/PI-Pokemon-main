import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { useHistory } from "react-router-dom";
import { searchPokemon } from "../../redux/actions/index.js";
import styles from '../SearchBar/SearchBar.module.css'
const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const history = useHistory();

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length !== 0) {
      dispatch(searchPokemon(name));
      // history.push(`/Details/${name}`);
    } else {
      alert("You must enter a name!");
    }
    setName("");
  }

  return (
    <div className={styles.form}>
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Pokemon!"
          value={name}
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">Search!</button>
         </form>
    </div>
  );
};
//<button type='submit' onClick={(e) => handleSubmit(e)}>Search!</button>

export default SearchBar;
