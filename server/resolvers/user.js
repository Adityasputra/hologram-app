const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const { hashPassword, comparedPassword } = require("../helpers/bcrytp");
const { signInToken } = require("../helpers/tokenGenerate");

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
    async signUp(_, args, context) {
      console.log("masuk");
      const { name, username, email, password } = args.register;
      const { db } = context;

      const checkUsername = await db.collection("users").findOne({ username });
      if (checkUsername) {
        throw new GraphQLError("Username already in use", {
          extensions: { code: "USERNAME_ALREADY_TAKEN" },
        });
      }
      console.log("Masuk 2");
      const checkEmail = await db.collection("users").findOne({ email });
      if (checkEmail) {
        throw new GraphQLError("Email already in use", {
          extensions: { code: "EMAIL_ALREADY_TAKEN" },
        });
      }

      console.log("Masuk 3");
      const hashedPassword = hashPassword(password);
      console.log(hashPassword);
      const newUser = {
        name,
        username,
        email,
        password: hashedPassword,
      };

      if (password.length < 5) {
        throw new GraphQLError("Password must have at least 5 characters", {
          extensions: { code: "BAD_INPUT_REQUEST" },
        });
      }

      await db.collection("users").insertOne(newUser);
      return {
        _id: newUser._id,
        name,
        username,
        email,
      };
    },
    async signIn(_, args, context) {
      const { email, password } = args.login;
      const { db } = context;

      const user = await db.collection("users").findOne({ email });
      if (!user) {
        throw new GraphQLError("User Not Found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      const validatePassword = await comparedPassword(password, user.password);
      if (!validatePassword) {
        throw new GraphQLError("Invalid Crendentials", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      const token = signInToken({
        id: user._id,
        email: user.email,
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
