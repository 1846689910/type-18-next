import React from "react";
import PropTypes from "prop-types";
import Status from "http-status";
import { send } from "micro";

export default function Alive({ status }) {
  console.log(status);
  return <></>;
}
Alive.propTypes = {
  status: PropTypes.number,
};

/**
 * @description for /alive of micro server(https://www.npmjs.com/package/micro)
 * @param {Object} context { params, req, res, query, preview, previewData }
 * @returns {Object} the component props
 */
export async function getServerSideProps(context) {
  const { res } = context;
  send(res, Status.OK, "");  // in micro, `return "hello world"` is equivalent to `send(res, 200, "hello world")`
  return {
    props: {
      status: Status.OK,
    }, // will be passed to the page component as props
  };
}
