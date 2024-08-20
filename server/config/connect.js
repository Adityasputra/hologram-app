const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://aditsputracv:sG8b87hOUBIbAGnX@test-database.m424j.mongodb.net/?retryWrites=true&w=majority&appName=test-database";

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
