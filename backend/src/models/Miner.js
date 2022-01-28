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
        type: DataTypes.STRING,
        allowNull: false,
      },
    id_simplemining: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    housing_fee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_simplemining: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass_simplemining: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });
};