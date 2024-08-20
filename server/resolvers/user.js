const { GraphQLError } = require("graphql");
const { hashPassword } = require("../helpers/bcrytp");
const { ObjectId } = require("mongodb");

let userData = [
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
    user: async (_, { id }) => {
      const user = userData.find((e) => e._id === id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }
      return user;
    },
  },

  Mutation: {
    regUser: async (_, { register }) => {
      const { name, username, email, password } = register;
      const checkName = userData.find((user) => user.username === username);
      if (checkName) {
        throw new GraphQLError("Username already in use", {
          extensions: { code: "USERNAME_ALREADY_TAKEN" },
        });
      }

      const checkEmail = userData.find((user) => user.email === email);
      if (checkEmail) {
        throw new GraphQLError("Email already in use", {
          extensions: { code: "EMAIL_ALREADY_TAKEN" },
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        _id: new ObjectId(),
        name,
        username,
        email,
        password: hashedPassword,
      };

      userData.push(newUser);

      return {
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      };
    },
  },
};

module.exports = resolvers;
