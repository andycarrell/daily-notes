module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "node", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "react/react-in-jsx-scope": ["off"],
    "react-hooks/exhaustive-deps": ["error"],
  },
  overrides: [
    {
      // override config files to allow them to run in node
      files: ["./*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": ["off"],
        "node/exports-style": ["error", "module.exports"],
      },
      globals: {
        module: true,
        require: true,
      },
    },
  ],
};
