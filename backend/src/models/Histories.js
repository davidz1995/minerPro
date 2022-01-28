const { DataTypes, DATE } = require("sequelize");
const { UUID } = require("uuid");

module.exports = (sequelize) => {
  let date = new Date()
  sequelize.define("history", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: date.now,
      allowNull: false,
    },
    eth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    usd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};