const axios = require("axios");
const { Pokemons, Types } = require("../db.js");
const { Op } = require("sequelize");

async function getPokemonsDb() {
  let pokemonsDb = await Pokemons.findAll({
    attributes: ["id", "name", "img", "createDb", "attack"],
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let pokemonsDbNew = pokemonsDb.map((m) => {
    return {
      ...m.dataValues,
      types: m.types.map((m) => m.name),
    };
  });

  return pokemonsDbNew;
}

async function getPokemonsApi() {
  const arrayPokemons = [];
  const firstCallPokeApi = await axios("https://pokeapi.co/api/v2/pokemon");
  const secondCallPokeApi = await axios(firstCallPokeApi.data.next);

  const firstPokemonUrl = firstCallPokeApi.data.results.map((e) => e.url);
  const secondPokemonUrl = secondCallPokeApi.data.results.map((e) => e.url);

  const allPokemonUrl = firstPokemonUrl.concat(secondPokemonUrl);
  const allPokemonsPromises = await Promise.all(allPokemonUrl);

  for (i = 0; i < allPokemonsPromises.length; i++) {
    const url = await axios(allPokemonUrl[i]);
    arrayPokemons.push({
      id: url.data.id,
      name: url.data.name,
      types: url.data.types.map((e) => e.type.name),
      img: url.data.sprites.front_default,
      attack: url.data.stats[1].base_stat,
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
      types: getPokemon.data.types.map((e) => e.type.name),
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
      attributes: ["name"],
      through: {
        attributes: ["name"], //investigar
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

async function findPokemonInApi(name) {
  let existInApi = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
    .catch(() => {
      return false;
    });
  if (existInApi) return true;
}

async function createPokemon(
  name,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  type,
  img,
  createDb
) {
  if (await findPokemonInApi(name))
    throw new Error(`the Pokemon "${name}"  already exists, try another name`);

  let existInDb = await Pokemons.findOne({ where: { name } });
  if (existInDb)
    throw new Error(
      `the Pokemon "${PokemonInDb.name}"  already exists, try another name`
    );

  const pokemonCreate = await Pokemons.create({
    name: name.toLowerCase(),
    life: parseInt(life, 10),
    attack: parseInt(attack, 10),
    defense: parseInt(defense, 10),
    speed: parseInt(speed, 10),
    height: parseInt(height, 10),
    weight: parseInt(weight, 10),
    img: img,
    createDb: createDb,
  });

  getPokemonTypes(); //eliminar una vez q el force este true
  let typesDb = await Types.findAll({
    where: { name: type },
  });

  await pokemonCreate.addTypes(typesDb);
  //si o si hay q elegir un tipo de pokeweon
  return pokemonCreate;
}

async function getPokemonTypes() {
  const pokemonTypesApi = await axios("https://pokeapi.co/api/v2/type");
  let pokemonTypes = pokemonTypesApi.data.results.map((e) => {
    return { name: e.name };
  });
  let pokemonsTypesDb = await Types.findAll({
    attributes: ["id", "name"],
  });
  if (pokemonsTypesDb.length === 0) {
    await Types.bulkCreate(pokemonTypes);
  }

  return pokemonsTypesDb;
}
/*
async function pokemonFiltered(data){
const {alphabeticalAsc, alphabeticalDsc} = data


  let allPokemons =await allPokemons()
  alphabeticalAsc= allPokemons.sort((a, b)=> a.name.localeCompare(b.name))
  console.log(alphabeticalAsc)

}

*/
module.exports = {
  allPokemons,
  getPokemonById,
  getPokemonByNameDbOrApi,
  getPokemonTypes,
  createPokemon,
  
};
