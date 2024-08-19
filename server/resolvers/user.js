const { GraphQLError } = require("graphql");

const userData = [
  {
    name: "Mumei",
    username: "Nanashi Mumei",
    email: "moom@mail.com",
    password: "moom123",
  },
];

const resolvers = {
  Query: {
    users: () => userData,
  },
};
