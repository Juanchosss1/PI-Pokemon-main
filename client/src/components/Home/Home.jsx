import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  sortByName,
  sortByStorage,
} from "../../redux/actions";
import Card from "../Card/Card";
import loadingHome from "../../img/loadingScreen.gif";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  const [types, setTypes] = useState("");

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleOrder(e) {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(sortByName(e.target.value));
    console.log(order);
  }

  function handleStoredIn(e) {
    let stored = e.target.value;
    dispatch(sortByStorage(stored));
    console.log(e.target.value);
  }

  function handleByTypes(e) {}

  // function handleStoredIn(e) {
  //   setStored(e.target.value);
  //   console.log(stored);
  // }

  return (
    <div>
      Home
      <div>
        <div>
          <label>Sort alphabetically:</label>
          <select onChange={(e) => handleOrder(e)}>
            <option value="none">None</option>
            <option value="asc">A-Z</option>
            <option value="dsc">Z-A</option>
          </select>
        </div>
        <div>
          <label>Stored in:</label>
          <select onChange={(e) => handleStoredIn(e)}>
            <option value="all">All</option>
            <option value="inDb">Stored in DB</option>
            <option value="inApi">Stored in API</option>
          </select>
        </div>
        <div>
          <label>Types: </label>
          <select onChange={(e) => handleByTypes(e)}>
            <option value="none">None</option>
            {allTypes &&
              allTypes.map((e) => {
                return <option value={e.name}>{e.name}</option>;
              })}
          </select>
        </div>
        {console.log(allPokemons)}
        {allPokemons.length !== 0 ? (
          allPokemons.map((c) => {
            return (
              <Link key={c.id} to={"/Details/" + c.id}>
                <Card id={c.id} name={c.name} img={c.img} type={c.types} />
              </Link>
            );
          })
        ) : (
          <div>
            <img src={loadingHome} alt={"loading"} />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
