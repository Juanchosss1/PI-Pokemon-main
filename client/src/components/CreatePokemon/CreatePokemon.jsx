import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllPokemons, getTypes } from "../../redux/actions";

const CreatePokemon = () => {

  const dispatch = useDispatch();
  const types = useSelector((state)=> state.types)
  useEffect(()=>{
    dispatch(getTypes())
    dispatch(getAllPokemons())
  },[dispatch, getTypes,getAllPokemons])

  console.log(types)
  const[input, setInput] = useState( {name:"",
  hp:"",
  attack:"",
  defense:"",
  speed:"",
  weight:"",
  height:"",
  img:"",
  types:[],})

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(createPokemon(input))  
  }

  return (
  <div>
    CreatePokemon
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Name: </label>
      <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)}/>
    </form>
    
    </div>);

};

export default CreatePokemon;
