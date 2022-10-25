const { Router } = require("express");
const { Types } = require("../db.js");

const router = Router();

router.get("/", (req, res) => {
  res.send("soy get /types");
});
//aca hace falta primero traer todos los types desde pokeapi y guardarlos en mi base
module.exports = router;
