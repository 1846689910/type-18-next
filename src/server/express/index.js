const express = require("express");
const { parse } = require("url");
const next = require("next");
const Fs = require("fs");
const Path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();
  server.get("/abc", (req, res) => res.send("abc"));
  server.all("*", handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
