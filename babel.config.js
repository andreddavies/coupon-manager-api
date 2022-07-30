module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@app": "./src/app.ts",
          "@config": "./src/config",
          "@routes/*": "./src/routes",
          "@schemas/*": "./src/schemas/",
          "@helpers/*": "./src/helpers/",
          "@middlewares/*": "./src/middlewares/",
          "@controllers/*": "./src/controllers/",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
