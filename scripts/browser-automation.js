const { Browser } = require("selenium-webdriver");
const execSync = require("child_process").execSync;
const Fs = require("fs");
const Path = require("path");

const useBrowserType = () => {
  const supportedBrowsers = Object.values(Browser);
  return (
    process.argv
      .filter(x => x.startsWith("-"))
      .map(x => x.substring(1))
      .find(x => supportedBrowsers.includes(x)) || Browser.CHROME
  );
};

const listJsFiles = rootDir =>
  Fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(x => x.isFile() && x.name.endsWith(".js"))
    .map(x => Path.join(rootDir, x.name));

listJsFiles(Path.resolve("browser-automation/cases")).forEach(file =>
  execSync(`node ${file}`, {
    env: {
      ...process.env,
      BROWSER_ENV: useBrowserType()
    }
  })
);
