const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

const resolvers = {
  Mutation: {
    createPost: (
      _,
      { content, tags, imgUrl, authorId, createdAt, updatedAt }
    ) => {
      const newPost = {
        _id: new ObjectId(),
        content,
        tags,
        imgUrl,
        authorId,
        createdAt,
        updatedAt,
      };
    },
  },
};
