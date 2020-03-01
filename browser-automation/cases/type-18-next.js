const { By, Key } = require("selenium-webdriver");

const { newWebDriver, wait, waitUntilBodyLocated } = require("../utils");

(async () => {
  const driver = await newWebDriver();
  const actions = driver.actions();

  try {
    await waitUntilBodyLocated(driver, "https://www.google.com/");

    await driver
      .findElement(By.css("input[type=text]"))
      .sendKeys("1846689910/type-18-next", Key.RETURN);

    await waitUntilBodyLocated(driver);

    await actions
      .move({
        duration: 500,
        origin: await driver.findElement(
          By.css("a[href='https://github.com/1846689910/type-18-next']")
        )
      })
      .click()
      .perform();

    await wait(driver, 3000);
  } finally {
    await driver.quit();
  }
})();
