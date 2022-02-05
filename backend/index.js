require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

mongoose
  .connect(MONGO_CONNECTION)
  .then(() => {
    console.log("Conectado a MinerPro MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

conn
  .sync({
    force: false,
  })
  .then(() => {
    console.log("Conectado a PSQL");
    server.listen(PORT, () => {
      console.log(`Estamos en el servidor ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
