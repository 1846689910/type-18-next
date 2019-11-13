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
      "/about": { page: "/about" },
      "/secondary/my-greeting": { page: "/secondary/my-greeting" },
      "/post/[postId]": { page: "/post/[postId]" },
      "/pipelines/[pipelineId]": { page: "/pipelines/[pipelineId]" },
      "/pipelines/[pipelineId]/states/[stateId]": {
        page: "/pipelines/[pipelineId]/states/[stateId]"
      },
      "/stylesDemo": { page: "/stylesDemo" }
    };
  }
});
