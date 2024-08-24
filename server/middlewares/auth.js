const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/tokenGenerate");
const { getDB } = require("../config/connect");
const { ObjectId } = require("mongodb");

const authentication = async (req) => {
  try {
    const db = await getDB();

    if (!req || !req.headers || !req.headers.authorization) {
      throw new GraphQLError("Missing Authorization Header", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new GraphQLError("Token not provided", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const verifiedToken = verifyToken(token);
    if (!verifiedToken) {
      throw new GraphQLError("Invalid Token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(verifiedToken.id) });
    if (!user) {
      throw new GraphQLError("User Not Found", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    };
  } catch (error) {
    console.error("Authentication Error:", error);
    throw new GraphQLError("Authentication failed", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
};

module.exports = authentication;
