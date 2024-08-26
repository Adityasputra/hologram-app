const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.DB_PW;

const client = new MongoClient(uri);

async function connect() {
  try {
    client.db("ig-db-project");
  } catch (error) {
    console.log("Error", error);
    await client.close();
  }
}

async function getDB() {
  return client.db("ig-db-project");
}

module.exports = { connect, getDB };
