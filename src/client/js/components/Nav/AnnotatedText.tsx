import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import MediaQueryContext from "../MediaQueryContext";

const useStyles = makeStyles((theme: Theme) => ({
  span: {
    position: "relative",
  },
  supNote: (attr: { isLightDevice: boolean }) => ({
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

type AnnotatedTextProps = {
  children: React.ReactElement | React.ReactElement[] | string;
  supNote?: string;
  subNote?: string;
};

export default function AnnotatedText({
  children,
  supNote,
  subNote,
}: AnnotatedTextProps) {
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
