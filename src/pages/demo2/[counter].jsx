import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { get, isNaN } from "lodash";
import Nav from "../../client/js/components/Nav";
import { setCounterAction } from "../../client/js/settings/actions";

export default function Demo2({ reason }) {
  console.log(reason);
  const dispatch = useDispatch();
  const mainCounter = useSelector((state) => state.counter.value);
  const router = useRouter();
  useEffect(() => {
    const counter = parseInt(get(router, "query.counter", 0));
    console.log(router);
    console.log(counter);
    if (mainCounter !== counter && !isNaN(counter)) {
      dispatch(setCounterAction(counter));
    }
  }, []);
  return (
    <Fragment>
      <Nav />
      <Container maxWidth="md">
        <Grid container>
          <Grid container item xs={12} justify="center">
            <strong>I am {router.asPath}</strong>
          </Grid>
          <Grid container item xs={12} justify="center"></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
Demo2.propTypes = {
  reason: PropTypes.string,
};

export const getServerSideProps = async () => {
  return {
    props: {
      reason: `Needs server-side-rendered page with Automatic Static Optimization disabled for getting nonEmpty router.query\n
      https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works`,
    },
  };
};
