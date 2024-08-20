const { GraphQLError } = require("graphql");
const { hashPassword, comparedPassword } = require("../helpers/bcrytp");
const { ObjectId } = require("mongodb");
const { verifyToken, signInToken } = require("../helpers/tokenGenerate");

const resolvers = {
  Query: {
    users: async (_, __, { db }) => {
      return await db.collection("users").find().toArray();
    },
    user: async (_, { id }, { db }) => {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }
      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      };
    },
  },

  Mutation: {
    regUser: async (_, { register }, { db }) => {
      const { name, username, email, password } = register;

      const checkUsername = await db.collection("users").findOne({ username });
      if (checkUsername) {
        throw new GraphQLError("Username already in use", {
          extensions: { code: "USERNAME_ALREADY_TAKEN" },
        });
      }

      const checkEmail = await db.collection("users").findOne({ email });
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

      await db.collection("users").insertOne(newUser);

      return {
        _id: newUser._id,
        name,
        username,
        email,
      };
    },

    logUser: async (_, { login }, { db }) => {
      const { email, password } = login;

      const user = await db.collection("users").findOne({ email });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      const validPassword = await comparedPassword(password, user.password);
      if (!validPassword) {
        throw new GraphQLError("Invalid Credentials", {
          extensions: { code: "INVALID_CREDENTIALS" },
        });
      }

      const token = signInToken({
        id: user._id,
        username: user.username,
      });

      return {
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        token,
      };
    },
  },
};

module.exports = resolvers;
