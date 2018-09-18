var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
// var history = require('connect-history-api-fallback');
var index = require('./routes/index');
const utils = require("./services/utils");

var app = express();

if(!utils.isEnvProduct()){
  app.locals.pretty=true;
  // app.locals.cache=true;
}
require('dotenv').load({
  path: path.join(__dirname, '.env')
});

const serverPath = function (file) {
  return path.resolve(__dirname, file);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(history());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'less'), {
  // force: true,
  // debug: true,
  dest: path.join(__dirname, '../' ,'public'),
  preprocess: {
    path: function (pathname, req) {
      return pathname.replace(path.sep + 'assets\\css' + path.sep, path.sep);
    }
  }
}));
app.use(express.static(path.join(__dirname, '../public')));

// 初始化语言，默认为简体中文
const lang = require('./services/Lang')(
  'zh-CN', path.resolve(__dirname, './lang')
);

const Manifest = require('./services/Manifest')(serverPath('../public/dist'));

app.use(function(req, res, next) {
  let cookieLang = req.cookies.lang;
  const urlLang = req.query.lang;
  // 终端
  req.adapter = require('./services/ua')(req);
  const UA = req.adapter;

  // 初始化语言包
  let LangMap = lang.get(urlLang||cookieLang);
  // 如果url里有语言则优先处理
  if (urlLang && (urlLang != cookieLang)) {
    cookieLang = urlLang;// cookie的lang重新取值，否则下面会根据geoip来设置语言
    res.cookie("lang", urlLang, { path: "/" });
  }
  req.LangMap = LangMap;
  // 设置语言
  if (cookieLang != LangMap.lang) {
    res.cookie("lang", LangMap.lang, { path: "/" });
  }

  Manifest.setPublicRoot(function () {
    return '/dist/'
  });

  req.Manifest = Manifest;

  // 重写render
  var _render = res.render;
  res.view = function (view, options, langGroups, fn) {
    const initalState = {
      lang: LangMap.lang,
      langMap: LangMap.languageMap,
      langAlias: lang.config.alias,
      api_url: process.env.API_URL,
      account_url: process.env.ACCOUNT_URL,
    };

    options = Object.assign(options || {}, {
      request: req,
      LangService: LangMap,
      Manifest: Manifest,
      initialState: initalState,
      isMobile: UA.isMobile,
      isIPhone: UA.iPhone,
    });

    _render.call(this, view, options, fn);
  }

  next();
});

// 语言文件路由
app.get("/i18n", function (req, res) {

  var args = require("url").parse(req.url, true).query;

  var langMap = lang.get(args.lang);
  var pages = args.pages.split(',');

  res.json(langMap.map(pages));
});

// 路由配置
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.view('common/404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('common/error',{
    message: err.message,
    error: {}
  });
});

module.exports = app;
