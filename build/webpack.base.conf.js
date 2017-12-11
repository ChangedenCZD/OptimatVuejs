'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, '../src');
// const entries = getEntry(srcDir + '/module/**/*.html');
let entriesParser = getEntry2(srcDir + '/module/**/config.json');
let entries = entriesParser[0];
let modulePageTitleList = entriesParser[1] || {};

/**提取文件路径,同名缩进一级*/
function extracted(filePath, filename, ext) {
  let key = 'src/module/';
  let file = filename + '.' + ext;
  let rootPath = filePath.substring(filePath.indexOf(key) + key.length, filePath.indexOf(file));
  let pathList = [];
  rootPath.split('/').forEach((item) => {
    if (item) {
      pathList.push(item);
    }
  });
  if (pathList.length > 0 && pathList[pathList.length - 1] === filename) {
    pathList[pathList.length - 1] = '';
    rootPath = pathList.join('/');
  }
  // console.log('相对路径 => ' + rootPath + file);
  return rootPath;
}

// 获取入口文件
function getEntry(globPath) {
  let entries = {}, filename;
  glob.sync(globPath).forEach(function (filePath) {
    filePath = filePath.replace(/.html/, '.js');
    filename = path.basename(filePath, path.extname(filePath));
    let rootPath = extracted(filePath, filename, 'js');
    filename = rootPath + filename;
    entries[filename] = filePath;
  });
  return entries;
}

// 获取入口文件
function getEntry2(globPath) {
  let entries = {}, modulePageTitleList = {};
  glob.sync(globPath).forEach(function (filePath) {
    let config = require(filePath);
    let moduleEntry = config['module-entry'] || '';
    let redirectUrl = (config['redirect-url'] || '').replace(/.html/g, '').split('/').filter((item) => {
      return !!item;
    }).join('/');
    let pageTitle = config['page-title'] || '';
    entries[redirectUrl] = filePath.substr(0, filePath.lastIndexOf('/') + 1) + moduleEntry;
    modulePageTitleList[redirectUrl] = pageTitle;
  });
  return [entries, modulePageTitleList];
}

function createHtml() {
  let r = [], filename, conf;
  glob.sync(srcDir + '/module/**/*.html').forEach(function (filePath) {
    filename = path.basename(filePath, path.extname(filePath));
    let rootPath = extracted(filePath, filename, 'html');
    conf = {
      filename: rootPath + filename + '.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency',
      template: filePath,
      timestamp: new Date().toLocaleString()
    };
    let rootFileName = rootPath + filename;
    if (rootFileName in entries) {
      conf.inject = 'body';
      conf.chunks = ['vendor', 'manifest', rootFileName];
    }
    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
}

function createHtml2() {
  let r = [], conf;
  Object.keys(entries).forEach((key) => {
    conf = {
      filename: `${key}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      inject: 'body',
      chunks: ['vendor', 'manifest', key],
      template: `${srcDir}/template/module/index.html`,
      timestamp: new Date().toLocaleString(),
      title: modulePageTitleList[key]
    };
    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
}

/*
 // 获取入口文件
 function getEntry(globPath) {
 let entries = {},
 filename;
 glob.sync(globPath).forEach(function (entry) {
 filename = path.basename(entry, path.extname(entry));
 let key = 'src/module/';
 let rootPath = entry.substring(entry.indexOf(key) + key.length, entry.indexOf(filename + '.js'));
 let lastIndex = rootPath.indexOf(filename);
 if (lastIndex > 0) {
 rootPath = rootPath.substring(0, rootPath.indexOf(filename));
 }
 filename = rootPath + filename;
 entries[filename] = entry;
 });
 return entries;
 }
 */
// 生成html
// function createHtml() {
//   let r = [], filename, conf;
//
//   glob.sync(srcDir + '/module/**/*.html').forEach(function (filePath) {
//     filename = path.basename(filePath, path.extname(filePath));
//     let key = 'src/module/';
//     let rootPath = filePath.substring(filePath.indexOf(key) + key.length, filePath.indexOf(filename + '.html'));
//     let lastIndex = rootPath.indexOf(filename);
//     if (lastIndex > 0) {
//       rootPath = rootPath.substring(0, rootPath.indexOf(filename));
//     }
//     conf = {
//       filename: rootPath + filename + '.html',
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeAttributeQuotes: true
//       },
//       chunksSortMode: 'dependency'
//     }
//     let rootFileName = rootPath + filename;
//     if (rootFileName in entries) {
//       conf.inject = 'body';
//       conf.chunks = ['vendor', 'manifest', rootFileName];
//     }
//     r.push(new HtmlWebpackPlugin(conf))
//   })
//
//   return r;
// }
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: createHtml2(),
};
