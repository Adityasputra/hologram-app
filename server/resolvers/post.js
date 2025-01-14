const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");
const redis = require("../config/redis");

const resolvers = {
  Query: {
    async getPosts(_, args, context) {
      const { db } = context;
      const cachedPosts = await redis.get("posts");
      if (cachedPosts) {
        return JSON.parse(cachedPosts);
      }

      const posts = await db
        .collection("posts")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
          {
            $unwind: "$author",
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $project: {
              _id: 1,
              content: 1,
              tags: 1,
              imgUrl: 1,
              authorId: 1,
              createdAt: 1,
              updatedAt: 1,
              "author.username": 1,
              "author.name": 1,
            },
          },
        ])
        .toArray();

      await redis.set("posts", JSON.stringify(posts), "EX", 3600);

      console.log(posts);
      return posts.map((post) => ({
        ...post,
        author: post.author.username,
      }));
    },
    async getPostById(_, args, context) {
      const { id } = args;
      const { db } = context;

      const cachedPost = await redis.get(`post:${id}`);
      if (cachedPost) {
        return JSON.parse(cachedPost);
      }

      const post = await db
        .collection("posts")
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
          {
            $unwind: "$author",
          },
          {
            $project: {
              _id: 1,
              content: 1,
              tags: 1,
              imgUrl: 1,
              authorId: 1,
              createdAt: 1,
              updatedAt: 1,
              "author.username": 1,
              "author.name": 1,
            },
          },
        ])
        .toArray();

      await redis.set(`post:${id}`, JSON.stringify(post[0]), "EX", 3600);

      console.log(post);
      return post[0]
        ? {
            ...post[0],
            author: post[0].author.username,
          }
        : null;
    },
  },
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
      await redis.del("posts");
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
      await redis.del("posts");
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
      if (!post) {
        throw new GraphQLError("Post not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const alreadyLiked = post.likes.some(
        (like) => like.username === user.username
      );
      if (alreadyLiked) {
        throw new GraphQLError("You already liked this post", {
          extensions: { code: "BAD_INPUT_REQUEST" },
        });
      }

      await db
        .collection("posts")
        .updateOne({ _id: new ObjectId(postId) }, { $push: { likes: like } });

      const updatedPost = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(postId) });
      await redis.del("posts");
      return updatedPost;
    },
  },
};

module.exports = resolvers;
