const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("type", {
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
