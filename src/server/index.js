const express = require("express");
const { parse } = require("url");
const next = require("next");
const Fs = require("fs");
const Path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/abc", (req, res) => res.send("abc"));
  server.use(handle);
  // server.get("/secondary/greeting", (req, res) => {
  //   app.render(req, res, "/secondary/greeting");
  // });

  // server.get("/post(/*)?", (req, res) => {
  //   const parsedUrl = parse(req.url, true)
  //   const { pathname, query } = parsedUrl
  //   app.render(req, res, "/post", {slug: query})
  // });
  // server.get("/*", (req, res) => {
  //   const parsedUrl = parse(req.url, true);
  //   const { pathname, query } = parsedUrl;
  //   handle(req, res, parsedUrl);
  // });
  server.listen(3000);
});
