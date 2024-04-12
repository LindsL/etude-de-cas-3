const { server } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);



mongoose.connect(config.mongoUri);
const db = mongoose.connection;

db.on("erreur", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("Base de données connectée");
});

server.listen(config.port, () => {
  console.log("Application lancée");
});
