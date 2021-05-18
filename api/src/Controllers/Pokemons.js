const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemons = async (req, res, next) => {
  try {
    let pokemons = await Pokemon.findAll({ include: [Type] });
    let pokemonsDb = pokemons.map((p) => {
      return {
        id: p.id,
        name: p.name,
        type: p.types.map((t) => t.name).join(", "),
        hp: p.hp,
        speed: p.speed,
        attack: p.attack,
        defense: p.defense,
        height: p.height,
        weight: p.weight,
        source: "Created",
      };
    });
    let pokeArray = [];
    let arrayPromises = [];
    for (let i = 1; i <= 45; i++) {
      arrayPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }
    Promise.all(arrayPromises).then((pokeArray) => {
      var pokemons = pokeArray.map((p) => {
        obj = {};
        (obj.name = p.data.name),
          (obj.id = p.data.id),
          (obj.source = "Api"),
          (obj.type = p.data.types.map((t) => t.type.name).join(", ")),
          (obj.image = p.data.sprites.other["official-artwork"].front_default),
          (obj.attack = p.data.stats.forEach((stat) => {
            if (stat.stat.name === "attack") {
              obj = {
                ...obj,
                attack: stat.base_stat,
              };
            }
          }));
        return obj;
      });
      res.send([...pokemons, ...pokemonsDb]);
    });
    console.log(pokemons);
    console.log(pokemonsDb);
  } catch (err) {
    next(err);
  }
};

// a slower option:
//       .then((res) => {
//         var obj = {};
//         obj.name = res.data.name;
//         obj.id = res.data.id;
//         obj.source = "Api";
//         obj.type = res.data.types.map((t) => t.type.name).join(", ");
//         obj.image = res.data.sprites.other["official-artwork"].front_default;
//         attack = res.data.stats.forEach((stat) => {
//           if (stat.stat.name === "attack") {
//             obj = {
//               ...obj,
//               attack: stat.base_stat,
//             };
//           }
//         });
//         pokeArray = pokeArray.concat([obj]);
//       })
//       .catch((err) => next(err));
//   }
//   res.send([...pokeArray, ...pokemonsDb]);
// } catch (err) {
//   next(err);
// }
// };

const getpokeDetails = async (req, res, next) => {
  const { idPoke } = req.params;
  try {
    if (idPoke) {
      const idpokeDb = await Pokemon.findOne({
        where: {
          id: idPoke,
        },
        include: [Type],
      });
      if (!idpokeDb) {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${idPoke}`)
          .then((p) => {
            const pokex = p.data;
            var pokeDetail = {
              name: pokex.name,
              weight: pokex.weight,
              height: pokex.height,
              type: pokex.types.map((t) => t.type.name).join(", "),
              image: pokex.sprites.other["official-artwork"].front_default,
              source: "Api",
              pokeId: pokex.id,
            };
            pokex.stats.forEach((stat) => {
              switch (stat.stat.name) {
                case "hp":
                  pokeDetail = {
                    ...pokeDetail,
                    hp: stat.base_stat,
                  };
                  break;
                case "attack":
                  pokeDetail = {
                    ...pokeDetail,
                    attack: stat.base_stat,
                  };
                  break;
                case "defense":
                  pokeDetail = {
                    ...pokeDetail,
                    defense: stat.base_stat,
                  };
                  break;
                case "speed":
                  pokeDetail = {
                    ...pokeDetail,
                    speed: stat.base_stat,
                  };
                  break;
                default:
                  break;
              }
            });
            res.send(pokeDetail);
          })
          .catch((err) => next(err));
      }
      if (idpokeDb) {
        res.send(idpokeDb);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getqueryPoke = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokeDb = await Pokemon.findOne({
        where: {
          name,
        },
      });
      if (!pokeDb) {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((p) => {
            const pokex = p.data;
            var pokeDetail = {
              name: pokex.name,
              weight: pokex.weight,
              height: pokex.height,
              type: pokex.types.map((t) => t.type.name),
              image: pokex.sprites.other["official-artwork"].front_default,
              id: pokex.id,
            };
            pokex.stats.forEach((stat) => {
              switch (stat.stat.name) {
                case "hp":
                  pokeDetail = {
                    ...pokeDetail,
                    hp: stat.base_stat,
                  };
                  break;
                case "attack":
                  pokeDetail = {
                    ...pokeDetail,
                    attack: stat.base_stat,
                  };
                  break;
                case "defense":
                  pokeDetail = {
                    ...pokeDetail,
                    defense: stat.base_stat,
                  };
                  break;
                case "speed":
                  pokeDetail = {
                    ...pokeDetail,
                    speed: stat.base_stat,
                  };
                  break;
                default:
                  break;
              }
            });
            res.send(pokeDetail);
          })
          .catch((err) => next(err));
      }
      if (pokeDb) {
        res.send(pokeDb);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const createPokemon = async (req, res, next) => {
  try {
    const {
      name,
      hp,
      speed,
      attack,
      defense,
      weight,
      height,
      typeId,
      typeId2,
    } = req.body;
    // const uuid = uuidv4(); //57d419d7-8ab9-4edf-9945-f9a1b3602c93
    // const uuidToInt = parseInt(uuid, 16);
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const newPokemon = await Pokemon.create({
      id: getRandomInt(45, 1500),
      name,
      hp,
      speed,
      attack,
      defense,
      weight,
      height,
    });
    let tyId = await Type.findOrCreate({
      where: { name: typeId },
    });
    await tyId[0].addPokemon(newPokemon);
    if (typeId2) {
      let tyId2 = await Type.findOrCreate({
        where: {
          name: typeId2,
        },
      });
      await tyId2[0].addPokemon(newPokemon);
      return res.status(200).json(newPokemon);
    } else {
      return res.json(newPokemon);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getPokemons, getpokeDetails, getqueryPoke, createPokemon };
