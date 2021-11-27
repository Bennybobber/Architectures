// ./src/database/mongo.js
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
  const mongo = new MongoMemoryServer();
  const mongoDBURL = 'mongodb+srv://beb:bennybobber22@cluster0.sny8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};