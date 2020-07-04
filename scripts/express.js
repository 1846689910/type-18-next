"use strict";

const shell = require("shelljs");

process.env.FORCE_COLOR = true;

shell.exec("npm run be");
shell.exec("node src/server/express");