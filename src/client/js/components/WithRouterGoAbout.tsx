import React from "react";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

const WithRouterGoAbout = ({ router }: WithRouterProps) => {
  console.log(`current pathname is ${router.pathname}`);
  const handler = () => {
    router.push({
      pathname: "/about",
      query: { name: "with router go about" }
    });
  };
  return <button onClick={handler}>WithRouterGoAbout</button>;
};

export default withRouter(WithRouterGoAbout);
