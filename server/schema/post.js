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

    input addPost {
        content: String!
        tags: []
        imgUrl: String
        comments: []
        likes: []
    }
    
    type Mutation {
        createPost(addPost: addPost!) : Post
    }
`;

module.exports = typeDefs;
