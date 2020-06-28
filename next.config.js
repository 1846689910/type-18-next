const { compose } = require("redux");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withStylus = require("@zeit/next-stylus");

const enableShortHash = true;

module.exports = compose(
  withCss,
  withSass,
  withLess,
  withStylus,
  withBundleAnalyzer
)({
  // TODO: work same as `withCss(withBundleAnalyzer({...}))`
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: `${
      enableShortHash ? "" : "[name]__[local]___"
    }"[hash:base64:5]"`
  },
  webpack: config => config,
  exportPathMap: async () => {
    return {
      "/": { page: "/" },
      "/demo1": { page: "/demo1" },
      "/demo2/[counter]": { page: "/demo2/[counter]" },
      "/folders/[folderId]": { page: "/folders/[folderId]" },
      "/folders/[folderId]/files/[fileId]": {
        page: "/folders/[folderId]/files/[fileId]"
      }
    };
  },
});
