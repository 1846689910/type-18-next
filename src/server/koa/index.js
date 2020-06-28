const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const { graphqlMiddlewareKoa2 } = require("./graphql-middleware-koa");
const Status = require("http-status");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get("/alive", async (ctx) => {
    ctx.status = Status.OK;
  });

  server.use(graphqlMiddlewareKoa2);

  router.all("/(.*)", async (ctx) => {  // breaking change from * to /(.*) match all routes from koa router 8 to 9
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
