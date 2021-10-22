module.exports = {
  env: {
    browser: true,
    jquery: true,
    mocha: true,
    es6: true,
    commonjs: true,
    amd: true,
    jest: true,
  },
  plugins: ["cypress"],
  extends: ["plugin:cypress/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Add your custom rules here
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-var": ["error"],
    "no-unused-vars": ["error"],
    "no-console": ["error"],
    "no-unused-expressions": ["error"],
    "no-undef": ["error"],
  },
  overrides: [
    {
      files: [
        "cypress/integration/**/*.spec.js",
      ],
      rules: {
        "cypress/no-async-tests": "off",
      },
    },
  ],
};
