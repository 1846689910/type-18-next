import React from "react";
import Router from "next/router";

const StaticRouterPushObjGoAbout = () => {
  const clickHandler = () =>
    Router.push({
      pathname: "/about",
      query: { name: "use obj to go about" }
    });
  return <button onClick={clickHandler}>UseObjGoAbout</button>;
};
export default StaticRouterPushObjGoAbout;
