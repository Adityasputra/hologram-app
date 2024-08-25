const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Mutation {
        followUser(followingId: ID!): Follow
        unfollowUser(followingId: ID!): String
    }
`;

module.exports = typeDefs;
