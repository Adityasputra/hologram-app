const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
    }

    type Comment {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Like {
        username: String!
        createdAt: String
        updatedAt: String
    }
    
    type Mutation {
        createPost(
            content: String!
            tags: [String]
            imgUrl: String
            authorId: ID!
            comments: [Comment]
            likes: [Like]
            createdAt: String
            updatedAt: String
        ) : Post
    }
`;

module.exports = typeDefs;
