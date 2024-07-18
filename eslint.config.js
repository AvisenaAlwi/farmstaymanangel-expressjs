export default [
  {
    files: ["src/**/*.js"],
    ignores: ["src/person.js"],
    rules: {
      "prefer-const": "error",
      "require-await": "error",
      semi: "error",
    },
  },
];
