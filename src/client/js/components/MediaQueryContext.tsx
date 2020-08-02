import React, { createContext } from "react";
import json2mq from "json2mq";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type ContextState = {
  mediaQuery: Record<string, boolean>;
  media: string;
  isMobile: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isTabletOrMobile: boolean;
};

const MediaQueryContext = createContext({} as ContextState);
export default MediaQueryContext;

export const QUERY = {
  MOBILE_S: "mobileS",
  MOBILE_M: "mobileM",
  MOBILE_L: "mobileL",
  TABLET: "tablet",
  LAPTOP: "laptop",
  LAPTOP_L: "laptopL",
  "4K": "4K",
};

export function MediaQueryProvider({
  children,
}: {
  children: React.ReactChild | React.ReactChild[];
}) {
  const { Provider } = MediaQueryContext;
  const mediaQuery = {
    mobileS: useMediaQuery(json2mq({ maxWidth: "320px" })),
    mobileM: useMediaQuery(json2mq({ minWidth: "321px", maxWidth: "375px" })),
    mobileL: useMediaQuery(json2mq({ minWidth: "375px", maxWidth: "425px" })),
    tablet: useMediaQuery(json2mq({ minWidth: "426px", maxWidth: "768px" })),
    laptop: useMediaQuery(json2mq({ minWidth: "769px", maxWidth: "1024px" })),
    laptopL: useMediaQuery(json2mq({ minWidth: "1025px", maxWidth: "1440px" })),
    "4K": useMediaQuery(json2mq({ minWidth: "1441px" })),
  };
  const media = Object.keys(mediaQuery).find((_) => mediaQuery[_]);
  const isMobile = [QUERY.MOBILE_S, QUERY.MOBILE_M, QUERY.MOBILE_L].some(
    (_) => media === _,
  );
  const isLaptop = media === QUERY.LAPTOP || media === QUERY.LAPTOP_L;
  const isTablet = media === QUERY.TABLET;
  const isTabletOrMobile = isTablet || isMobile;
  return (
    <Provider
      value={{
        mediaQuery,
        media,
        isMobile,
        isLaptop,
        isTablet,
        isTabletOrMobile,
      }}
    >
      {children}
    </Provider>
  );
}
