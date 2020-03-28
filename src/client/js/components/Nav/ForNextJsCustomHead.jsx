import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

export default function ForNextJsCustomHead({ asPath }) {
  const atHome = asPath === "/";
  return (
    <Head>
      <title>{`type-18-next ${atHome ? "" : asPath}`}</title>
      {asPath && (
        <link
          key="leaflet-css"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css"
          integrity="sha256-SHMGCYmST46SoyGgo4YR/9AlK1vf3ff84Aq9yK4hdqM="
          crossOrigin="anonymous"
        />
      )}
    </Head>
  );
}
ForNextJsCustomHead.propTypes = {
  asPath: PropTypes.string
};
