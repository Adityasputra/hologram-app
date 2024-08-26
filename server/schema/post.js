const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String
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

    type Query {
        getPosts: [Post]
        getPostById(id: ID!): Post
    }

    input CreatePostInput {
        content: String!
        tags: [String]
        imgUrl: String
    }

    
    type Mutation {
        addPost(input: CreatePostInput): Post
        commentPost(postId: ID!, content: String!): Post
        likePost(postId: ID!): Post
    }
`;

module.exports = typeDefs;
