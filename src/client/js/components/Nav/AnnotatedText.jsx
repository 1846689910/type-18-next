import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import MediaQueryContext from "../MediaQueryContext";

const useStyles = makeStyles((theme) => ({
  span: {
    position: "relative",
  },
  supNote: (attr) => ({
    fontSize: attr.isLightDevice ? "12px" : "14px",
    position: "relative",
    top: "-5px",
    fontWeight: "bold",
    color: attr.isLightDevice ? "" : theme.palette.primary.main,
  }),
  subNote: {
    fontSize: "12px",
    marginLeft: "-32px",
  },
}));

export default function AnnotatedText({ children, supNote, subNote }) {
  const { isTablet, isMobile } = useContext(MediaQueryContext);
  const isLightDevice = isTablet || isMobile;
  const classes = useStyles({ isLightDevice });
  return (
    <span className={classes.span}>
      {children}
      {supNote && <sup className={classes.supNote}>{supNote}</sup>}
      {subNote && <sub className={classes.subNote}>{subNote}</sub>}
    </span>
  );
}
AnnotatedText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  supNote: PropTypes.string,
  subNote: PropTypes.string,
};
