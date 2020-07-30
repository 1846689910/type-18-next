"use strict";

const shell = require("shelljs");

process.env.FORCE_COLOR = true;

shell.exec("npm run be");
if (process.argv.includes("--touch")) process.env.touch = true;
shell.exec("node src/server/express");
