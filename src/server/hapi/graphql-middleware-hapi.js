const { ApolloServer } = require("apollo-server-hapi");
const { typeDefs, resolvers } = require("../utils/graphql");

const apolloServerHapi = new ApolloServer({
  typeDefs,
  resolvers
});

module.exports = { apolloServerHapi };