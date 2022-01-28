const { DataTypes } = require("sequelize");
const { UUID } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define("miner", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_simplemining: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    housing_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_simplemining: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass_simplemining: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};