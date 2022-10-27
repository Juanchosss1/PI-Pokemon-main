import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import Card from "../Card/Card";
const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  console.log(allPokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div>
      Home
      <div>
        {allPokemons.map((c) => {
          return <Card name={c.name} img={c.img} />;
        })}
      </div>
    </div>
  );
};

export default Home;
