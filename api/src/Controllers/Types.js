const axios = require("axios");
const { Type } = require("../db");

const getTypes = async (req, res, next) => {
  let type;
  try {
    await axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      res.data.results.map((type) => {
        Type.findOrCreate({
          where: {
            name: type.name,
          },
        });
      });
    });
    type = await Type.findAll({
      attributes: ["name", "typeId"],
    });
    return res.send(type);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTypes,
};
