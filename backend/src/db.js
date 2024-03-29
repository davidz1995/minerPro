require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
//const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    omitNull: false,
  }
); */

const { DB_USER, DB_PASSWORD, DB_HOST, PORT, DB_NAME } = process.env;
var pg = require("pg");
pg.defaults.ssl = true;

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  native: false,
  omitNull: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Farm, History, Miner } = sequelize.models;

// Relaciones
User.hasMany(Miner);
//Miner.belongsTo(User);

User.hasMany(History);
//History.belongsTo(User);

Farm.hasMany(Miner);
//Miner.belongsTo(Farm);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
