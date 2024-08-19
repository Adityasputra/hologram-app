const typeDefs = `#graphql
    type User {
        name: String
        username: String!
        email: String!
        password: String!
    }

    type Query {
        Users: [User]
    }
`;

