var config = {
    entry: './main.js',
    output: {
       path:'/',
       filename: 'index.js',
    },
    devtool:'source-map',
    devServer: {
       inline: true,
       historyApiFallback: true,
       port: 8080
    },
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015', 'react']
             }
          }
       ]
    }
 }
 module.exports = config;