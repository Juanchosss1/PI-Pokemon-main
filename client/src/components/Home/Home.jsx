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
import loadingHome from "../../img/Home/moltresTransparent.gif";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "../Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");

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
    setOrder(e.target.value);
  }
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
    setCurrent(1);
  }

  function handleStoredIn(e) {
    let stored = e.target.value;
    dispatch(sortByStorage(stored));
    setCurrent(1);
    setOrder(e.target.value);
  }
  function handleOrderAttack(e) {
    e.preventDefault();
    dispatch(sortByAttack(e.target.value));
    setOrder(e.target.value);
    setCurrent(1);
  }

  function handleByTypes(e) {
    e.preventDefault();
    dispatch(sortByType(e.target.value));
    setCurrent(1);
    setOrder(e.target.value);
    console.log(order);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Home!
        </button>

        <div className={styles.header}>
          <div>
            <button>
              <NavLink className={styles.link} to="/create">
                Create!
              </NavLink>
            </button>
          </div>
          <div className={styles.searchbar}>
            <SearchBar />
          </div>
        </div>
        <div className={styles.filters}>
          <label>Sort alphabetically:</label>
          <div>
            <select className={styles.options} onChange={(e) => handleOrder(e)}>
              <option value="asc">- A-Z</option>
              <option value="dsc">- Z-A</option>
            </select>
          </div>
          <div>
            <label>Stored in:</label>
            <select onChange={(e) => handleStoredIn(e)}>
              <option value="all">- All</option>
              <option value="inDb">- Stored in DB</option>
              <option value="inApi">- Stored in API</option>
            </select>
          </div>
          <div>
            <label>Types: </label>
            <select onChange={(e) => handleByTypes(e)}>
              <option value="none">- None</option>
              {allTypes &&
                allTypes.map((e) => {
                  return (
                    <option key={e.name} value={e.name}>
                      - {e.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>Sort by attack:</label>
            <select onChange={(e) => handleOrderAttack(e)}>
              <option value="higher">Higher Attack</option>
              <option value="lower">Lower Attack</option>
            </select>
          </div>
        </div>
        <div className={styles.card}>
          {currentPokemons.length !== 0 ? (
            currentPokemons.map((c) => {
              return (
                <div className={styles.card}>
                  <ul>
                    <NavLink
                      className={styles.link}
                      key={c.id}
                      to={"/Details/" + c.id}
                    >
                      <Card
                        id={c.id}
                        name={c.name}
                        img={c.img}
                        type={c.types}
                      />
                    </NavLink>
                  </ul>
                </div>
              );
            })
          ) : (
            <div>
              <img
                className={styles.loadingsize}
                src={loadingHome}
                alt={"loading"}
              />
              <p>Loading...</p>
            </div>
          )}
        </div>
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
