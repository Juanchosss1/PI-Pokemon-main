const { Router } = require("express");
const { Pokemons } = require("../db.js");
const Types = require("../models/Types.js");
const {
  getPokemonsDb,
  getPokemonsApi,
  getPokemonById,
  allPokemons,
  getPokemonByNameApi,
  getPokemonByNameDbOrApi,
} = require("./controllers.js");

const router = Router();

// router.get("/", async (req, res, next) => {            //todos los pokemones de la db
//   return await Pokemons.findAll().then((pokemons) => {
//     res.status(200).json(pokemons);
//   });
// });

// router.get("/api", async (req, res, next) => {       //todos los pokemones de la api
//   try {
//     let pokemonsApi = await getPokemonsApi();
//     res.status(200).json(pokemonsApi);
//   } catch (err) {
//     console.log(err); //crear componente de;
//   }
// });

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
      // let pokemonsForHome = allPoke.map((e) => {
      //   return {
      //     name: e.name,
      //     type: e.type,
      //     img: e.img,
      //   };
      // });
      res.status(200).json(/*pokemonsForHome*/allPoke);
    } catch (err) {
      console.log(err); //crear componente de;
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
  const { name, life, atack, defense, speed, height, weight, type } = req.body;
  if (!name) {
    return res.status(404).send("You should enter a name");
  }
  try {
    const pokemonCreate = await Pokemons.create({
      name: name.toLowerCase(),
      life: life,
      attack: atack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
    });

    let pokemonTypesDb = await Types.findAll({
      where: {name: type}
    
    })
    pokemonCreate.addTypes(pokemonTypesDb)
    res.status(201).json(pokemonCreate.toJSON());
  } catch (err) {
    return res.status(401).send("Error en alguno de los datos provistos");
  }
});

module.exports = router;
