const axios = require("axios");
const { Pokemons, Types } = require("../db.js");
const { Op } = require("sequelize");

async function getPokemonsDb() {
  let pokemonsDb = await Pokemons.findAll({
    include: {
      model: Types,
      attributes: ["id", "name"],
      //   through: {
      //     attributes: [],
      //   },
    },
  });
  return pokemonsDb;
}

async function getPokemonsApi() {
  const pokemonsUrlApi = await axios(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5"
  );
  const pokemonUrl = pokemonsUrlApi.data.results.map((e) => e.url);
  let arrayPokemons = [];

  for (i = 0; i < pokemonUrl.length; i++) {
    const url = await axios(pokemonUrl[i]);
    arrayPokemons.push({
      name: url.data.name,
      height: url.data.height,
      weight: url.data.weight,
      life: url.data.stats[0].base_stat,
      atack: url.data.stats[1].base_stat,
      defense: url.data.stats[2].base_stat,
      speed: url.data.stats[5].base_stat,
      type: url.data.types.map((e) => e.type.name),
      img: url.data.sprites.front_default,
    });
  }

  return arrayPokemons;
}

async function allPokemons() {
  let pokemonsDb = await getPokemonsDb();
  let pokemonsApi = await getPokemonsApi();
  let allPokemons = pokemonsDb.concat(pokemonsApi);

  return allPokemons;
}

async function getPokemonByNameApi(value) {
  try {
    let getPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase().trim()}`
    );

    let pokemonDetailsApi = {
      id: getPokemon.data.id,
      name: getPokemon.data.name,
      type: getPokemon.data.types.map((e) => e.type.name),
      img: getPokemon.data.sprites.front_default,
      life: getPokemon.data.stats[0].base_stat,
      atack: getPokemon.data.stats[1].base_stat,
      defense: getPokemon.data.stats[2].base_stat,
      speed: getPokemon.data.stats[5].base_stat,
      height: getPokemon.data.height,
      weight: getPokemon.data.weight,
    };
    return pokemonDetailsApi;
  } catch (err) {
    throw new Error(
      `The pokemon with the name ${value} doesn´t exits, you should try creating one`
    );
  }
}

async function getPokemonByNameDbOrApi(value) {
  let getPokemonByNameDb = await Pokemons.findAll({
    where: {
      name: value,
    },
    attributes: [
      "id",
      "name",
      "life",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
      "img",
    ],
    include: {
      model: Types,
      attributes: ["id", "name"],
      through: {
        PokemonsTypes: [], //investigar
      },
    },
  });
  if (!getPokemonByNameDb.length) return getPokemonByNameApi(value);

  return getPokemonByNameDb;
}

async function getPokemonById(id) {
  if (id.length > 10) {
    let pokemonDetailsDb = await Pokemons.findOne({
      where: { id: id },
      include: {
        model: Types,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
    return pokemonDetailsDb;
  } else {
    return getPokemonByNameApi(id);
  }
}

async function getPokemonTypes() {
  const pokemonTypes = await axios("https://pokeapi.co/api/v2/type");
  let pokemonTypesMap = pokemonTypes.data.results.map((e) => e.name);
}

module.exports = {
  getPokemonsDb,
  getPokemonsApi,
  allPokemons,
  getPokemonById,
  getPokemonByNameApi,
  getPokemonByNameDbOrApi,
};
