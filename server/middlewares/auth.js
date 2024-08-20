const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/tokenGenerate");
const { getDB, connect } = require("../config/connect");
const { ObjectId } = require("mongodb");
const authentication = async (req) => {
  try {
    const db = await getDB();
    if (!req.headers.authorization) {
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

    const verifyTkn = verifyToken(token);
    if (!verifyTkn) {
      throw new GraphQLError("Invalid Token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(verifyTkn.id) });

    if (!user) {
      throw new GraphQLError("User Not Found", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    }
    
    return { id: user._id };
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = authentication;
