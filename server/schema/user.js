const typeDefs = `#graphql
    type User {
        _id: ID!
        name: String
        username: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    input Register {
        name: String
        username: String!
        email: String!
        password: String!
    }

     type LoginRes {
        user: User
        token: String!
    }

    input Login {
        email: String!
        password: String!
    }

    type Mutation {
        regUser(register: Register!): User
        logUser(login: Login!): LoginRes
    }
`;

module.exports = typeDefs;
