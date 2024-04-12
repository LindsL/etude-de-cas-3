const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'erreur de connection:'));
db.once('open', () => {
  console.log('Base de données connectée');
});

module.exports = db;