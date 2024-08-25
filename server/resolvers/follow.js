const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

const resolvers = {
  Mutation: {
    async followUser(_, args, context) {
      const { followingId } = args;
      const { db } = context;

      const user = await context.authentication();
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      const followed = await db.collection("follows").findOne({
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(user.id),
      });

      if (followed) {
        throw new Error("You are already following this user");
      }

      console.log(followingId, "<=== Following ID");
      console.log(user.id, "<<<Userid");
      const newFollow = {
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(user.id),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await db.collection("follows").insertOne(newFollow);
      return {
        _id: newFollow._id.toString(),
        followingId: newFollow.followingId.toString(),
        followerId: newFollow.followerId.toString(),
        createdAt: newFollow.createdAt,
        updatedAt: newFollow.updatedAt,
      };
    //   return updatedUser;
    },
    async unfollowUser(_, args, context) {
      const { followingId } = args;
      const { db } = context;

      const user = await context.authentication();

      const result = await db.collection("follows").deleteOne({
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(user.id),
      });

      if (result.deletedCount === 0) {
        throw new Error("You are not following this user");
      }

      return "Successfully unfollowed the user";
    },
  },
};

module.exports = resolvers;
