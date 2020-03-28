import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Typography, Chip } from "@material-ui/core";
import { useRouter } from "next/router";
import MediaQueryContext, { QUERY } from "../MediaQueryContext";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import LaptopIcon from "@material-ui/icons/Laptop";
import HdIcon from "@material-ui/icons/Hd";

export default function Title({ classes }) {
  const router = useRouter();
  return (
    <Container className={classes.hc} maxWidth="md">
      <Grid
        className={classes.hcg}
        container
        alignItems="flex-end"
        justify="space-between"
      >
        <Typography variant="h4" onClick={() => router.push("/")}>
          Type 18 next
        </Typography>
        <MediaChip />
      </Grid>
    </Container>
  );
}
Title.propTypes = {
  classes: PropTypes.object
};

function MediaChip() {
  const { media } = useContext(MediaQueryContext);
  let icon;
  switch (media) {
    case QUERY.MOBILE_S:
    case QUERY.MOBILE_M:
    case QUERY.MOBILE_L:
      icon = <SmartphoneIcon />;
      break;
    case QUERY.TABLET:
      icon = <TabletMacIcon />;
      break;
    case QUERY.LAPTOP:
    case QUERY.LAPTOP_L:
      icon = <LaptopIcon />;
      break;
    default:
      icon = <HdIcon />;
  }
  return <Chip label={media} icon={icon} variant="outlined" size="small" />;
}
