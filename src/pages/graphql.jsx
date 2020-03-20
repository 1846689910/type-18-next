import React from "react";
import PropTypes from "prop-types";
import { ApolloServer } from "apollo-server-micro";
import { nextDevResolvers, typeDefs } from "../server/utils/graphql";
import { json } from "micro";

const apolloServer = new ApolloServer({
  resolvers: nextDevResolvers,
  typeDefs
});
const handler = apolloServer.createHandler({ path: "/graphql" });

export default function Graphql(props) {
  console.log(props);
  return <></>;
}
Graphql.propTypes = {
  props: PropTypes.object
};

/**
 * @description for /graphql of micro server
 * @param {Object} context
 * @returns {Object} the component props
 */
export async function getServerSideProps(context) {
  const { req, res } = context;
  const body = await json(req);
  console.log(body);
  await handler(req, res);
  return {
    props: {} // will be passed to the page component as props
  };
}
