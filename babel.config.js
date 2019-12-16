module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env"];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime", {
        "corejs": false,
        "helpers": false,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ];
  return {
    presets,
    plugins
  };
}