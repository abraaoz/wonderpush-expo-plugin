module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
    },
  ],
  parserOptions: {
    project: "tsconfig.json",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "no-extra-boolean-cast": "off",
  },
}
