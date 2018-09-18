'use strict'
process.env.NODE_ENV = 'production';
const fs = require("fs");
const glob = require("glob");
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfigPc = require('./webpack.prod.conf'); //pc平台编译配置
const webpackConfigMobile = require('./webpack.prod.m.conf'); //mobile平台编译配置

function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}
let cleanPath = resolvePath('public/dist'); // 需要清除的目录

// 获取build的平台
const platform = process.argv[3];
const _ = require("lodash");
let webpackConfig = webpackConfigPc;
if(platform==='pc'){
  webpackConfig = webpackConfigPc;
} else if(platform === 'mobile'){
  webpackConfig = webpackConfigMobile;
}

const spinner = ora('building for production...')
spinner.start()

function cleanRemain(){
  const files = glob.sync(cleanPath + "/**/*", { nodir: true });

  let fileMap = {};
  _.forEach(files, (ps) => {
    const result_name = path.relative(cleanPath, ps).replace(/\\/g, '/');
    const matched = /([^\.]+)(\.([0-9a-z]{7}))(\.\w+)/.exec(result_name);
    if (matched) {
      const origin_name = matched[1] + matched[4];

      const mtime = fs.statSync(ps).mtime.valueOf();

      const newFile = { name: result_name, mtime: mtime };
      if (!fileMap.hasOwnProperty(origin_name)) {
        fileMap[origin_name] = [];
      }
      fileMap[origin_name].push(newFile);
    }
  })
  // 保留最新的两个文件，其余的加入清除列表
  let result = [];
  _.forEach(fileMap, (files, name) => {
    const unused = _.orderBy(files, ['mtime'], ['desc']).slice(2);
    _.forEach(unused, (file) => {
      result.push(path.join(cleanPath, file.name));
    })
  })
  // 清除无用的js public dist目录
  _.forEach(result,(v)=>{
    v&&rm(v,function(err){
      if(err) throw err;
    });
  })

  // 清除后启动webpack
  runWebpack();
}
function runWebpack(){
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
}
cleanRemain();

