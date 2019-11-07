const fetch = require("isomorphic-unfetch");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  distDir: "dist",
  exportPathMap: async () => {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/secondary/my-greeting": { page: "/secondary/my-greeting" },
      "/post/[postId]": { page: "/post/[postId]" },
      "/pipelines/[pipelineId]": { page: "/pipelines/[pipelineId]" },
      "/pipelines/[pipelineId]/states/[stateId]": {
        page: "/pipelines/[pipelineId]/states/[stateId]"
      }
    };
  }
});
