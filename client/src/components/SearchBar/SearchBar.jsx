import React from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { searchPokemon} from '../../redux/actions/index.js'
const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name.length !== 0){
            dispatch(searchPokemon(name))
        }else{
            alert('You must enter a name!')
        }
        setName('')
    }

  return (
    <div>SearchBar
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Pokemon!' value={name} onChange={(e) => handleInput(e)}/>
        <button type='submit'>Search!</button>
        </form>
    </div>
  )
}
//<button type='submit' onClick={(e) => handleSubmit(e)}>Search!</button>

export default SearchBar