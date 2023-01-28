const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@styles': path.resolve(__dirname, '../src/assets/styles'),
  };
  return config;
};
