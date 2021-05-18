const { Router } = require("express");
const {
  getPokemons,
  getpokeDetails,
  createPokemon,
  getqueryPoke,
} = require("../Controllers/Pokemons");
const router = Router();

router.get("/", getPokemons);
router.get("/pokemons", getqueryPoke);
router.get("/:idPoke", getpokeDetails);
router.post("/pokemons", createPokemon);

module.exports = router;
