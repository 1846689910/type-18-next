const { Browser } = require("selenium-webdriver");
const execSync = require("child_process").execSync;

const useBrowserType = () => {
  const supportedBrowsers = Object.values(Browser);
  return (
    process.argv
      .filter(x => x.startsWith("-"))
      .map(x => x.substring(1))
      .find(x => supportedBrowsers.includes(x)) || Browser.CHROME
  );
};

execSync("node browser-automation/cases/type-18-hek", {
  env: {
    ...process.env,
    BROWSER_ENV: useBrowserType()
  }
});
