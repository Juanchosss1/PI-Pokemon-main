import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPage, getDetails } from "../../redux/actions";
import loadingDetails from "../../img/loadingScrenDetails.gif";
const Details = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, props]);

  const pokemonsDetails = useSelector((state) => state.pokemonDetails);
  console.log(pokemonsDetails);
  return Object.keys(pokemonsDetails).length !== 0 ? (
    <div>
      <h1>{pokemonsDetails.name.toUpperCase()}</h1>
      <img src={pokemonsDetails.img} alt={pokemonsDetails.name} />
      <div>
        <li>Life: {pokemonsDetails.life} </li>
        <li>Attack: {pokemonsDetails.attack}</li>
        <li>Defense: {pokemonsDetails.defense}</li>
        <li>Speed: {pokemonsDetails.speed}</li>
        <li>Height: {pokemonsDetails.height}</li>
        <li>Weight: {pokemonsDetails.weight}</li>
        <li>N°: #{pokemonsDetails.id}</li>
      </div>
    </div>
  ) : (
    <div>
      <img src={loadingDetails} alt="" />
      <p>Loading...</p>
    </div>
  );
};

export default Details;
