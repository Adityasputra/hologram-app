const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// User Schema
const userResolvers = require("./resolvers/user");
const userTypeDefs = require("./schema/user");
const { connect, getDB } = require("./config/connect");

// Post Schema
// const postResolvers = require();
// const postTypeDefs = require("./schema/post");

// Follow Schema
// const followResolvers = require();
// const followTypeDefs = require("./schema/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
});

(async () => {
  try {
    await connect();
    const db = await getDB();

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: ({ req, res }) => {
        return {
          db,
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log("Error", error);
  }
})();
