const Hapi = require("@hapi/hapi");
const next = require("next");
const Path = require("path");
const {
  nextHandlerWrapper,
  defaultHandlerWrapper,
  pathWrapper
} = require("./handlers");
const { apolloServerHapi } = require("./graphql-middleware-hapi");
const Status = require("http-status");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = parseInt(process.env.PORT, 10) || 3000;
const server = new Hapi.Server({ port, host: "localhost" });

app.prepare().then(async () => {

  await server.register(require("inert"));

  server.route({
    method: "GET",
    path: "/alive",
    handler: async (request, h) => {
      return h.response().code(Status.OK);
    },
  });

  server.route({
    method: "GET",
    path: "/a",
    handler: pathWrapper(app, "/a")
  });

  server.route({
    method: "GET",
    path: "/_next/{p*}" /* next specific routes */,
    handler: nextHandlerWrapper(app)
  });

  server.route({
    method: "GET",
    path: "/images/{filename}" /* use next to handle static files */,
    handler: (request, h) => {
      return h.file(Path.resolve("public/images", request.params.filename));
    }
  });

  server.route({
    method: "*",
    path: "/{p*}" /* catch all route including http://localhost:3000 */,
    handler: defaultHandlerWrapper(app)
  });


  try {
    await apolloServerHapi.applyMiddleware({ app: server });
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
  }
});
