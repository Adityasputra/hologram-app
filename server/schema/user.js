const typeDefs = `#graphql
    type User {
        _id: ID!
        name: String
        username: String!
        email: String!
        followers: [User]
        following: [User]
    }

    type Query {
        users: [User]
        user(id: ID!): User
        searchUsers( query: String!): [User]
        getUserById(id: ID!): User
    }

   type SignInResponse {
    token: String
   }

   input SignUp {
    name: String
    username: String!
    email: String!
    password: String!
   }

   input SignIn {
    email: String
    password: String 
   }

    type Mutation {
        signIn(login: SignIn!): SignInResponse
        signUp(register: SignUp): User
    }
`;

module.exports = typeDefs;
