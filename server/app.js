const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { connect, getDB } = require("./config/connect");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// User Schema
const userResolvers = require("./resolvers/user");
const userTypeDefs = require("./schema/user");
const authentication = require("./middlewares/auth");

// Post Schema
const postResolvers = require("./resolvers/post");
const postTypeDefs = require("./schema/post");

// Follow Schema
const followResolvers = require("./resolvers/follow");
const followTypeDefs = require("./schema/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

(async () => {
  try {
    await connect();
    const db = await getDB();

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
      context: async ({ req, res }) => {
        return {
          db,
          authentication: async () => await authentication(req),
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log("Error", error);
  }
})();
