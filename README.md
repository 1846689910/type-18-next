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