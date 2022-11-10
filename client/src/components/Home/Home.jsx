import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  sortByAttack,
  sortByName,
  sortByStorage,
  sortByType,
} from "../../redux/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import loadingHome from "../../img/loadingScreen.gif";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  // const [types, setTypes] = useState("");
  const [currentPage, setCurrent] = useState(1);
  const pokemonsPerPage = 12;

  const indexLastPok = currentPage * pokemonsPerPage;
  const indexFirstPok = indexLastPok - pokemonsPerPage;
  const currentPokemons = allPokemons?.slice(indexFirstPok, indexLastPok);

  const pagination = (currentPage) => {
    setCurrent(currentPage);
  };

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
    setCurrent(1);
    console.log(e.target.value);
  }
  function handleOrderAttack(e) {
    let attack = e.target.value;
    dispatch(sortByAttack(attack));
    setCurrent(1);
    console.log(attack);
  }

  function handleByTypes(e) {
    let type = e.target.value;
    // console.log(type)
    setCurrent(1);
    dispatch(sortByType(type));
  }

  console.log(currentPokemons);
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
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label>Sort by attack:</label>
          <select onChange={(e) => handleOrderAttack(e)}>
            <option value="all">All</option>
            <option value="higher">Higher Attack</option>
            <option value="lower">Lower Attack</option>
          </select>
        </div>

        {console.log(allPokemons)}
        {currentPokemons.length !== 0 ? (
          currentPokemons.map((c) => {
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
        <div>
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            pagination={pagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
