const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/tokenGenerate");

const authentication = () => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verify = verifyToken(token);

      if (!verify) {
        throw new GraphQLError("Invalid Token", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    }


    // return { req.user : }
  } catch (error) {
    console.log("Error", error);
  }
};
