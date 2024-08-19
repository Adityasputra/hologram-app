const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// User Schema
const userResolvers = require("./resolvers/user");
const userTypeDefs = require("./schema/user");

// Post Schema
// const postResolvers = require();
// const postTypeDefs = require("./schema/post");

// Follow Schema
// const followResolvers = require();
// const followTypeDefs = require("./schema/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs,],
  resolvers: [userResolvers,],
});

startStandaloneServer(server, {
  listen: { port: 3000 },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log("Error", err);
  });
