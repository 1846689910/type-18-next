const { Builder, Browser, Origin, until, By } = require("selenium-webdriver");
const Promise = require("bluebird");

const { CHROME } = Browser;

/**
 * @returns {ThenableWebDriver}
 */
async function newChromeDriver() {
  require("chromedriver");
  return new Builder().forBrowser(CHROME).build();
}

/**
 * @returns {ThenableWebDriver}
 */
async function newWebDriver() {
  if (process.env.BROWSER_ENV === CHROME) {
    return newChromeDriver();
  }
  throw new Error(
    `UnsupportedBrowserType: ${process.env.BROWSER_ENV}, only support chrome currently`
  );
}

/**
 * @description let driver wait for X ms
 * @param {ThenableWebDriver} driver
 * @param {Number} ms
 * @returns {Promise}
 */
async function wait(driver, ms) {
  return driver.wait(
    Promise.delay(ms).then(() => false),
    ms
  );
}

/**
 * @description focus viewport
 * @param {ThenableWebDriver} driver
 * @returns {Promise}
 */
async function focusViewport(driver) {
  return driver
    .actions()
    .move({
      origin: Origin.VIEWPORT
    })
    .click()
    .perform();
}

/**
 * @description ensure url or the current page <body> located
 * @param {ThenableWebDriver} driver
 * @param {String} url load page url
 * @param {Number} timeout the timeout ms for page loading
 * @param {Promise}
 */
async function waitUntilBodyLocated(
  driver,
  url,
  timeout = 3000,
  doFocus = true
) {
  if (url) await driver.get(url);
  const located = await driver.wait(
    until.elementLocated(By.css("body")),
    timeout
  );
  return doFocus ? focusViewport(driver) : located;
}

module.exports = {
  newWebDriver,
  newChromeDriver,
  wait,
  focusViewport,
  waitUntilBodyLocated
};
