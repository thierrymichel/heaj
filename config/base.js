const path = require('path')

/**
 * Webpack shared base config
 *
 * @returns {Object} - global configuration
 */
module.exports = function base() {
  return {
    entry: {
      main: './src/main.js',
    },
    output: {
      path: path.join(__dirname, '/../dist'),
      filename: '[name].bundle.js',
    },
    resolve: {
      modules: [
        path.join(__dirname, '../src/components'),
        'node_modules',
      ],
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      }],
    },
  };
}
