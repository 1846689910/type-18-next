import { schema, root } from "../utils/graphql";
import { graphql } from "graphql";
import { ApolloServer } from "apollo-server-koa";
import { typeDefs, resolvers } from "../utils/graphql";

/**
 * @deprecated
 * @param {Object} ctx 
 */
const graphqlMiddlewareKoa = async ctx => {
  const { query } = ctx.request.body;
  console.log(query);
  ctx.body = await graphql(schema, query, root);
};

const graphqlMiddlewareKoa2 = new ApolloServer({ typeDefs, resolvers }).getMiddleware();

module.exports = { graphqlMiddlewareKoa, graphqlMiddlewareKoa2 };
