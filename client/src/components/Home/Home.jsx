import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import Card from "../Card/Card";
import loadingHome from "../../img/loadingScreen.gif";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div>
      Home
      <div>
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
