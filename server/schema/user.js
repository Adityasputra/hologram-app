const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
        user(id: ID): User
    }

    input Register {
        name: String
        username: String!
        email: String!
        password: String!
    }

    type Mutation {
        regUser(register: Register): User
    }
`;

module.exports = typeDefs;
