const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'to-do-list': './app/client/to-do-list.js',
        'buildings': './app/client/buildings.js',
        'payments': './app/client/payments.js',
        'login': './app/client/login.js',
        'home': './app/client/home.js',
        'users': './app/client/users.js',
        'error': './app/client/error.js',
        'landing': './app/client/landing.js',
        'profile': './app/client/profile.js'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"]
          },
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/, 
          loader: [
            MiniCSSExtractPlugin.loader,
            "css-loader",
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCSSExtractPlugin()
    ]
};
