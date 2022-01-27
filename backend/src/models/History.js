const { DataTypes } = require("sequelize");
const { UUID } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define("history", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    usd: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
