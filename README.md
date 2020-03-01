# type-18-next

## development
```bash
npm run dev
# OR
yarn run dev
```

```bash
PORT=3000 npm start
```

## build and export

```bash
npm run build
npm run export
# OR
yarn run build
yarn run export
```
combined command
```bash
npm run be
# OR
yarn run be
```

## analyze bundle structure
```bash
npm run analyze
# OR
yarn run analyze
```

## **Browser Automation**

```bash
npm run browser-automation -chrome
# OR
yarn run browser-automation -chrome
```

- does not support the other browsers on the [list](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/capabilities_exports_Browser.html)
- implemented with [`selenium-webdriver`](https://www.npmjs.com/package/selenium-webdriver) + [`chromedriver`](https://www.npmjs.com/package/chromedriver) (chrome >= 80)

<img src="./doc/images/yarn-ba.gif" alt="demo browser automation" width="80%"/>

## test

```bash
npm test
# OR
yarn test
```
- enzyme configuration in `test/mocha.config.js`
- mocha configuration: `.mocharc.yml` include `test/mocha.config.js`

## run with self defined server

```bash
npm run express
npm run hapi
npm run koa
```

OR

```bash
yarn run express
yarn run hapi
yarn run koa
```