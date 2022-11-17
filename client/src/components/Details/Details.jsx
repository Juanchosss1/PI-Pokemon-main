import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPage, deletePokemon, getDetails } from "../../redux/actions";
import loadingDetails from "../../img/loadingScrenDetails.gif";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../Details/Details.module.css";
const Details = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, props]);

  const pokemonsDetails = useSelector((state) => state.pokemonDetails);

  const handleClick = (e) => {
    let warning = "Are you sure to delete this pokemon?";
    if (window.confirm(warning) === true) {
      dispatch(deletePokemon(pokemonsDetails.id));
      alert("Pokemon successfully deleted");
      history.push("/home");
    } else {
      return null;
    }
  };

  return Object.keys(pokemonsDetails).length !== 0 ? (
    <div>
      <NavLink to="/home">
        <i className={styles.arrowLeft}></i>
      </NavLink>

      <div>
        {pokemonsDetails.createDb ? (
          <button onClick={handleClick} className={styles.btn}>
            DELETE
          </button>
        ) : null}
      </div>
      <div className={styles.container}>
        <h1>{pokemonsDetails.name.toUpperCase()}</h1>
        <img
          className={styles.containerimg}
          src={pokemonsDetails.img}
          alt={pokemonsDetails.name}
        />
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
    </div>
  ) : (
    <div>
      <img src={loadingDetails} alt="" />
      <p>Loading...</p>
    </div>
  );
};

export default Details;
