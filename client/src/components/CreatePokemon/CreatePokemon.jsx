import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllPokemons, getTypes } from "../../redux/actions";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    img: "",
    types: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createPokemon(input));
  }

  return (
    <div>
      CreatePokemon
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Type: </label>
          <select onChange={handlerCH}>
            {types.length !== 0 ? (
              types.map((t) => {
                return (
                  <div>
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  </div>
                );
              })
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreatePokemon;
