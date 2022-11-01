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
  }, [dispatch, getTypes]);

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
/*
  function handleChecked(e){
   
      let checked = e.target.checked
      if(checked){
        setInput({
          ...input,
          types: [...input.types,e.target.value]
        });
  
      }
    }
    */
  console.log(types)

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
          
            {/*types.length !== 0 ? (
              types.map((t) => {
                return (
                  <div>
                    <input type='checkbox' value={t.name} name={t.name} >
                      {t.name}
                    </input>
                  </div>
                );
              })
            ) : (
              <option>Loading...</option>
            )*/}
          
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreatePokemon;
