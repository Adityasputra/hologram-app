const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const { hashPassword, comparedPassword } = require("../helpers/bcrytp");
const { signInToken } = require("../helpers/tokenGenerate");

const resolvers = {
  Query: {
    async getUserById(_, args, context) {
      const { id } = args;
      const { db } = context;

      const user = await db
        .collection("users")
        .aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followingId",
              as: "followers",
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followerId",
              as: "following",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followers.followerId",
              foreignField: "_id",
              as: "followersDetails",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "following.followingId",
              foreignField: "_id",
              as: "followingDetails",
            },
          },
          {
            $project: {
              name: 1,
              username: 1,
              email: 1,
              followers: "$followersDetails",
              following: "$followingDetails",
            },
          },
        ])
        .next();

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      return user;
    },
    async searchUsers(_, args, context) {
      const { query } = args;
      const { db } = context;

      const users = await db
        .collection("users")
        .find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { username: { $regex: query, $options: "i" } },
          ],
        })
        .toArray();

      return users;
    },
    async users(_, args, context) {
      const { db } = context;
      const users = await db.collection("users").find().toArray();
      return users;
    },
    async user(_, args, context) {
      const { id } = args;
      const { db } = context;

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      return user;
    },
  },

  Mutation: {
    async signUp(_, args, context) {
      const { name, username, email, password } = args.register;
      const { db } = context;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new GraphQLError("Invalid email format", {
          extensions: { code: "INVALID_EMAIL_FORMAT" },
        });
      }

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

      if (password.length < 5) {
        throw new GraphQLError("Password must have at least 5 characters", {
          extensions: { code: "BAD_INPUT_REQUEST" },
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        name,
        username,
        email,
        password: hashedPassword,
      };

      const result = await db.collection("users").insertOne(newUser);
      return { ...newUser, _id: result.insertedId };
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
        throw new GraphQLError("Invalid Credentials", {
          extensions: { code: "INVALID_CREDENTIALS" },
        });
      }

      const token = signInToken({
        id: user._id,
        email: user.email,
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
