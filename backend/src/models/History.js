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
      type: DataTypes.DATE,
      defaultValue: Date.now,
      allowNull: false,
    },
    eth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
