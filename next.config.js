const fetch = require("isomorphic-unfetch");

const getShows = async () => {
  const data = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  return (await data.json()).map(x => x.show);
};

module.exports = {
  exportPathMap: async () => {
    const shows = (await getShows()).reduce((p, v) => {
      p[`/post/${v.id}`] = { page: "/post", query: { slug: v.id } };
      return p;
    }, {});

    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/secondary/my-greeting": { page: "/secondary/my-greeting" },
      "/post/1": { page: "/post" },
      ...shows,
    };
  }
};
