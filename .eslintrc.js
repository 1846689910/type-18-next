module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    mocha: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser", //"babel-eslint",
  plugins: ["react", "@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed. You can also use `16.0`, `16.3`, etc
      flowVersion: "0.53", // Flow version
    },
  },
  rules: {
    "no-undef": 2,
    semi: 2,
    strict: 0,
    quotes: 1,
    // indent: [2, 2],
    "no-use-before-define": [2, "nofunc"],
    "no-unused-vars": [1, "all"],
    "no-mixed-requires": [1, true],
    eqeqeq: 0,
    "new-cap": 2,
    "no-else-return": 1,
    "no-eq-null": 1,
    "no-lonely-if": 1,
    "no-path-concat": 1,
    "comma-dangle": 0,
    "no-floating-decimal": 1,
    "no-void": 1,
    "keyword-spacing": 1,
    "react/prop-types": 1,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/react-in-jsx-scope": 1,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
};
