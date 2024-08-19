const { GraphQLError } = require("graphql");

const userData = [
  {
    _id: "1",
    name: "Mumei",
    username: "Nanashi Mumei",
    email: "moom@mail.com",
    password: "moom123",
  },
  {
    _id: "2",
    name: "Roara",
    username: "Roara Panthera",
    email: "raora@mail.com",
    password: "roara123",
  },
];

const resolvers = {
  Query: {
    users: () => userData,
    user: async (_, args) => {
      const { id } = args;
      const user = userData.find((u) => u._id === id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }
      return user;
    },
  },

  Mutation: {
    reqUser: async (_, args, contextValue) => {
      const { newUser } = args;
      if (!newUser) {
        throw new GraphQLError("Invalid Email/Password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return newUser;
    },
  },
};

module.exports = resolvers;
