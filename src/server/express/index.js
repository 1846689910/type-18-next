const express = require("express");
const next = require("next");
const { graphqlMiddleware2 } = require("./graphql-middleware");
const Status = require("http-status");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;


app.prepare().then(() => {
  const server = express();

  server.get("/alive", (_, res) => {
    res.status(Status.OK).end();
  });
  
  server.use(graphqlMiddleware2);

  server.all("*", handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
