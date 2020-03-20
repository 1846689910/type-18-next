import { ApolloServer } from "apollo-server-hapi";
import { typeDefs, resolvers } from "../utils/graphql";

const apolloServerHapi = new ApolloServer({
  typeDefs,
  resolvers
});

module.exports = { apolloServerHapi };