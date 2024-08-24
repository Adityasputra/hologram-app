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

    input CreatePost {
        content: String!
        tags: [String]
        imgUrl: String
    }
    
    type Mutation {
        addPost(input: CreatePost): Post
        commentPost(postId: ID!, content: String!): Post
        likePost(postID: ID!): Post
    }
`;

module.exports = typeDefs;
