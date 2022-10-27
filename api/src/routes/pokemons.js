const { Router } = require("express");
const { Pokemons } = require("../db.js");
const Types = require("../models/Types.js");
const {
  getPokemonById,
  allPokemons,
  getPokemonByNameDbOrApi,
  createPokemon,
} = require("./controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      let pokemonByName = await getPokemonByNameDbOrApi(name);
      res.status(200).json(pokemonByName);
    } catch (err) {
      res.status(404).send(`The pokemon with name "${name}" doesn´t exist`);
    }
  } else {
    try {
      let allPoke = await allPokemons();
      res.status(200).json(allPoke);
    } catch (err) {
      console.log(err); //crear componente de error;
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let pokemonById = await getPokemonById(id);
    res.status(200).json(pokemonById);
  } catch (err) {
    res.status(404).send(`The pokemon with id/name "${id}" doesn´t exist...`);
  }
});

router.post("/", async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, type } = req.body;
  try {
    let newPokemon = await createPokemon(
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      type
    );
    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(400).send(`the name "${name}" its already in use`);
  }
});

module.exports = router;
