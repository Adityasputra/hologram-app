const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const authentication = require("../middlewares/auth");

const resolvers = {
  Mutation: {
    async addPost(_, args, context) {
      const { input } = args;
      const { db } = context;

      const user = await context.authentication();
      if (!user) {
        throw new GraphQLError("Authentication required", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const newPost = {
        content: input.content,
        tags: input.tags || [],
        imgUrl: input.imgUrl || "",
        authorId: user.id,
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await db.collection("posts").insertOne(newPost);
      return { ...newPost, _id: result.insertedId };
    },
  },
};

module.exports = resolvers;
