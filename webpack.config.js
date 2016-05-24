const path = require('path');

module.exports = {
  entry: {
    'react-goban-example': './examples/react-goban-example.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples'),
    filename: '[name].dist.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
