import React from "react";
import PropTypes from "prop-types";
import { ApolloServer } from "apollo-server-micro";
import { nextDevResolvers, typeDefs } from "../server/utils/graphql";
import { json, send } from "micro";
import { OK } from "http-status";

const apolloServer = new ApolloServer({
  resolvers: nextDevResolvers,
  typeDefs,
});
const handler = apolloServer.createHandler({ path: "/graphql" });

export default function Graphql(props) {
  console.log(props);
  return <></>;
}
Graphql.propTypes = {
  props: PropTypes.object,
};

/**
 * @description for /graphql of micro server
 * @param {Object} context { params, req, res, query, preview, previewData }
 * @returns {Object} the component props
 */
export async function getServerSideProps(context) {
  const { req, res } = context;
  console.log([req.headers.host, req.url, req.method]);
  console.log(res);
  
  if (req.method === "OPTIONS") {
    return send(res, OK);
  }
  const body = await json(req);
  console.log(`graphql body = ${JSON.stringify(body, null, 2)}`);
  await handler(req, res);
  res.writeHead(OK, "", { "Access-Control-Allow-Origin": "*" });
  return {
    props: {}, // will be passed to the page component as props
  };
}
