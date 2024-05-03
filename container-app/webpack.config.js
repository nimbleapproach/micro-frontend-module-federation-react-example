const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  mode: 'development',
  
  entry: './src/ContainerApp.jsx',
  
  output: {
    publicPath: 'auto',
  },
  
  devServer: {
    port: 3030,
    historyApiFallback: true,
    watchFiles: [
      path.resolve(__dirname, '../remote-app'),
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'containerApp',
      remotes: {},
      shared: {
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
      },
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