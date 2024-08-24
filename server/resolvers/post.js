const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

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
    async commentPost(_, args, context) {
      const { postId, content } = args;
      const { db } = context;
      const user = await context.authentication();
      console.log(user);

      if (!user) {
        throw new GraphQLError("Authentication required", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const comment = {
        content,
        username: user.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.collection("posts").updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: { comments: comment },
        }
      );

      const post = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(postId) });
      return post;
    },
    async likePost(_, args, context) {
      const { postId } = args;
      const { db } = context;

      const user = await context.authentication();
      if (!user) {
        throw new GraphQLError("Authentication required", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const like = {
        username: user.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const post = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(postId) });

      console.log(post, "<==== Post Like");
      console.log(like, "<< this like");
      const alreadyLiked = post.likes.some(
        (like) => like.username === user.username,
        console.log(like.username, "<<<< Like"),
        console.log(user.username, "<<<<< User")
      );

      if (alreadyLiked) {
        throw new GraphQLError("You already Likes this post", {
          extensions: { code: "BAD_INPUT_REQUEST" },
        });
      }

      await db.collection("posts").updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: {
            likes: like,
          },
        }
      );

      const likePost = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(postId) });

      return likePost;
    },
  },
};

module.exports = resolvers;
