const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const { graphqlMiddlewareKoa2 } = require("./graphql-middleware-koa");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  // router.get("/abc", async ctx => {
  //   await app.render(ctx.req, ctx.res, "/abc", ctx.query);
  //   ctx.respond = false;
  // });

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
