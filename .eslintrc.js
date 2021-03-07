// downgrade the priorities for some rules to warnings
const warnRules = ["global-require"].reduce(
  (acc, rule) => ({ ...acc, [rule]: "warn" }),
  {}
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react",
    "plugin:testing-library/recommended",
    "plugin:jest-dom/recommended",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    ...warnRules,
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "react/jsx-props-no-spreading": "off",
      },
    },
  ],
  globals: {
    React: "writable",
  },
};
