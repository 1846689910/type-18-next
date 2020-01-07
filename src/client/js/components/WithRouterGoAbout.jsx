import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";

const WithRouterGoAbout = ({ router }) => {
  console.log(`current pathname is ${router.pathname}`);
  const handler = () => {
    router.push({
      pathname: "/about",
      query: { name: "with router go about" }
    });
  };
  return <button onClick={handler}>WithRouterGoAbout</button>;
};
WithRouterGoAbout.propTypes = {
  router: PropTypes.object
};

export default withRouter(WithRouterGoAbout);
