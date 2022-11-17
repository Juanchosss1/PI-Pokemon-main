const { Router } = require("express");
const { Pokemons } = require("../db.js");
const Types = require("../models/Types.js");
const {
  getPokemonById,
  allPokemons,
  getPokemonByNameDbOrApi,
  createPokemon,
  pokemonFiltered,
} = require("./controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    try {
      let pokemonByName = await getPokemonByNameDbOrApi(name);
      res.status(200).json(pokemonByName);
    } catch (err) {
      res
        .status(404)
        .send(/*`The pokemon with name "${name}" doesn´t exist`*/ err.message);
    }
  } else {
    try {
      let allPoke = await allPokemons();
      res.status(200).json(allPoke);
    } catch (err) {
      err.message; //crear componente de error;
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
  const {
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
    img,
    createDb,
  } = req.body;
  try {
    let newPokemon = await createPokemon(
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      img,
      createDb
    );
    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Pokemons.destroy({
      where: { id },
    });
    res.status(200).json(`Pokemon id: ${id} deleted`);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
module.exports = router;
