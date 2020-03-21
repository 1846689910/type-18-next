const { schema, root } = require("../utils/graphql");
const { graphql } = require("graphql");
const { ApolloServer } = require("apollo-server-koa");
const { typeDefs, resolvers } = require("../utils/graphql");

/**
 * @deprecated
 * @param {Object} ctx 
 */
const graphqlMiddlewareKoa = async ctx => {
  const { query } = ctx.request.body;
  ctx.body = await graphql(schema, query, root);
};

const graphqlMiddlewareKoa2 = new ApolloServer({ typeDefs, resolvers }).getMiddleware();

module.exports = { graphqlMiddlewareKoa, graphqlMiddlewareKoa2 };
