// babel.config.js
module.exports = function configBabel(api) {
  api.cache(true);

  const presets = ['@babel/preset-typescript'];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
