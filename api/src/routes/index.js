const { Router } = require("express");
const Pokemons = require("../routes/pokemons");
const Types = require("../routes/types");

const router = Router();

router.use("/", Pokemons);
router.use("/types", Types);
router.use("/pokemons", Pokemons);

module.exports = router;
