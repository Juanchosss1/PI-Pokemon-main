const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokemonsRoute = require("./pokemons.js");
const typesRoute = require("./types.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRoute);
router.use("/types", typesRoute);

module.exports = router;
