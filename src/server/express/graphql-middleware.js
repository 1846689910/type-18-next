const graphqlHTTP = require("express-graphql");
const { schema, root } = require("../utils/graphql");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../utils/graphql");


/**
 * @deprecated
 */
const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});

const graphqlMiddleware2 = new ApolloServer({
  typeDefs,
  resolvers
}).getMiddleware();

module.exports = {
  graphqlMiddleware,
  graphqlMiddleware2
};
