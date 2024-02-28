const webpack = require('webpack');

module.exports = {
  // Your existing configuration...
  plugins: [
    // DefinePlugin can be used to define environment variables or provide polyfills.
    new webpack.ProvidePlugin({
      process: 'process/browser', // This tells Webpack to use the "process" browser polyfill.
    }),
  ],
  resolve: {
    fallback: {
      "util": require.resolve("util/"), // For util
      "path": require.resolve("path-browserify"), // For path
      // Add process here if you haven't installed the process package
      "process": require.resolve("process/browser"), // For process
    }
  }
};
