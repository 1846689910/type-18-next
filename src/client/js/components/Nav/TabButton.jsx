import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

/**
 *
 * @description regular tab button
 */
export default function TabButton({ route, handleClick, classes }) {
  const router = useRouter();
  return (
    <Button
      className={classes.btnGroup}
      variant="contained"
      color={route.path === router.pathname ? "secondary" : "default"}
      onClick={() => handleClick(route.path)}
    >
      {route.label}
    </Button>
  );
}
TabButton.propTypes = {
  route: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string
  }),
  handleClick: PropTypes.func,
  classes: PropTypes.object
};
