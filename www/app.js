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
  console.log("BD ok : Base de données connectée");
});

server.listen(config.port, () => {
  console.log("Application lancée");
});

let queue = [];
let timeout;

function saveDocuments() {
  if (queue.length > 0) {
    try {
      Promise.all(queue.map(doc => doc.save())).then(() => {
        console.log('Les documents ont été enregistrés !');
      }).catch(error => {
        console.error('Echec de la sauvergarde des documents:', error);
      });
    } finally {
      queue = [];
      timeout = null;
    }
  }
}

function addToQueue(doc) {
  queue.push(doc);
  if (!timeout) {
    timeout = setTimeout(saveDocuments, 35000); 
  }
}

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("Base de données connectée!");
}).catch(err => {
  console.log(err);
});

const articlesSchema = mongoose.model('articlesschema', new mongoose.Schema({
  
}));