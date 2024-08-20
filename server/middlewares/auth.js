const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/tokenGenerate");
const { getDB, connect } = require("../config/connect");
const authentication = async (req) => {
  try {
    const db = await getDB();
    const token = req.headers.authorization.split(" ")[1];
    const verifyTkn = verifyToken(token);
    if (!verifyTkn) {
      throw new GraphQLError("Invalid Token", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }
    const user = await db.collection("users").findOne({ _id: verifyTkn.id });
    return { id: user._id };
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = authentication;
