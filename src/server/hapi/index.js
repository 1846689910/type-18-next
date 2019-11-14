const Hapi = require("@hapi/hapi");
const { parse } = require("url");
const next = require("next");
const Fs = require("fs");
const Path = require("path");
const {
  nextHandlerWrapper,
  defaultHandlerWrapper,
  pathWrapper
} = require("./handlers");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const port = parseInt(process.env.PORT, 10) || 3000;
const server = new Hapi.Server({ port, host: "localhost" });

app.prepare().then(async () => {

  await server.register(require("inert"));

  server.route({
    method: "GET",
    path: "/a",
    handler: pathWrapper(app, "/a")
  });

  server.route({
    method: "GET",
    path: "/b",
    handler: pathWrapper(app, "/b")
  });

  server.route({
    method: "GET",
    path: "/_next/{p*}" /* next specific routes */,
    handler: nextHandlerWrapper(app)
  });

  server.route({
    method: "GET",
    path: "/{filename}" /* use next to handle static files */,
    handler: (request, h) => {
      return h.file(Path.resolve("./public", request.params.filename));
    }
  });

  server.route({
    method: "*",
    path: "/{p*}" /* catch all route including http://localhost:3000 */,
    handler: defaultHandlerWrapper(app)
  });


  try {
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log("Error starting server");
    console.log(error);
  }
});
