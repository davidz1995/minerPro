const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};