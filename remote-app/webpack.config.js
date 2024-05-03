const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'development',
  
  entry: './src/RemoteApp.jsx',
  
  output: {
    publicPath: 'auto',
  },
  
  devServer: {
    port: 3131,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './remoteApp': './src/RemoteAppBody.jsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^18.3.1'
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^18.3.1'
        },
      }
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};