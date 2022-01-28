const { DataTypes } = require("sequelize");
const { UUID } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define("farm", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue:'Offline',
        allowNull: false,
      },
    gpus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restarts: {
      type: DataTypes.INTEGER,
      defaultValue:0,
      allowNull: false,
    },
  });
};
