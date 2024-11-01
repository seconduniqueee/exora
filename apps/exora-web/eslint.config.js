const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.js");

module.exports = [
  ...baseConfig,
  ...nx.configs["flat/angular"],
  ...nx.configs["flat/angular-template"],
  {
    files: ["**/*.ts"],
    rules: {
      "@nx/enforce-module-boundaries": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/label-has-associated-control": "off",
    },
  },
];
