"use strict";

const shell = require("shelljs");

process.env.FORCE_COLOR = true;

if (!process.argv.includes("--skip-build")) {
  shell.exec("npm run be", {
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });
}

if (process.argv.includes("--touch")) process.env.touch = true;
shell.exec("node src/server/hapi", {
  env: {
    ...process.env,
    NODE_ENV: "production",
  },
});
