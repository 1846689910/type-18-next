import React, { Fragment } from "react";
import Status from "http-status";
import { send } from "micro";
import Http from "http";

type AliveProps = {
  status: number;
};

const Alive = ({ status }: AliveProps): React.ReactElement => {
  console.log(status);
  return <Fragment />;
};

export default Alive;

/**
 * @description for /alive of micro server(https://www.npmjs.com/package/micro)
 * @param {Object} context { params, req, res, query, preview, previewData }
 * @returns {Object} the component props
 */
export async function getServerSideProps(context: {
  res: Http.ServerResponse;
}): Promise<{ props: { status: number } }> {
  const { res } = context;
  send(res, Status.OK, ""); // in micro, `return "hello world"` is equivalent to `send(res, 200, "hello world")`
  return {
    props: {
      status: Status.OK,
    }, // will be passed to the page component as props
  };
}
