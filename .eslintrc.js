module.exports = {
    env: {
      node: true,
      browser: true,
      jest: true,
      es6: true
    },
    parser: "@typescript-eslint/parser",
    plugins: ["unused-imports", "simple-import-sort"],
    extends: [
      "prettier",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@next/next/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:react/jsx-runtime"
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/prefer-interface": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/camelcase": "off",
      "import/no-unresolved": "off",
      "unused-imports/no-unused-imports-ts": 2,
      "unused-imports/no-unused-imports": "error",
      "react/prop-types": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": "error"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  };