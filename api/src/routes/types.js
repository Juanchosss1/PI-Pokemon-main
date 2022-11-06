const { Router } = require("express");
const { Types } = require("../db.js");
const { getPokemonTypes } = require("../routes/controllers.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let allPokemonTypes = await getPokemonTypes();
    res.status(200).json(allPokemonTypes);
  } catch (err) {
    res.status(404).send(err);
  }
});
//aca hace falta primero traer todos los types desde pokeapi y guardarlos en mi base
module.exports = router;
