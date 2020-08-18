
const multipleThemesCompile = require('webpack-multiple-themes-compile');
const {merge} = require('webpack-merge');
const con = require('./webpack.config');

module.exports = merge(
  con,
  multipleThemesCompile({
    styleLoaders:[{loader:'style-loader'},{ loader: 'css-loader' },{ loader: 'less-loader',options: {        
        lessOptions: {
            javascriptEnabled: true                           
        }
      }}],
    themesConfig: {
      green: {
        'base-color': '#008000'
      },
      yellow: {
        'base-color': '#ffff00'
      }
    }
  }))