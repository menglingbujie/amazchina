/**
 * Created by Xuzhe on 2016/11/23.
 */
var FS = require('fs');
var Path = require('path');
var glob = require('glob');
var _ = require('lodash');

var retval = {};

function loadFile(path, ext) {
  try {
    if (ext == '.js') {
      return require(path);
    } else if (ext == '.txt') {
      var lines = FS.readFileSync(path, "utf8").trim().split('\n');
      if (lines.length == 1) {
        return lines[0];
      }
      return lines;
    }
  } catch(e) {
    console.log('load lang file failed: '+path, e);
    return null;
  }
  return null;
}

function getType(o) {
  var _t;
  return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}

var files = glob.sync(__dirname + "/**/*", { nodir: true});


files.forEach(function(path){
  var ext = Path.extname(path);
  var basename = Path.basename(path, ext);

  if (!basename.startsWith('lang_')) {
    return;
  }

  var dotKey = basename.substr('lang_'.length);

  var val = loadFile(path, ext);

  if (val) {
    var origin = _.get(retval, dotKey);
    if (!origin) {
      _.set(retval, dotKey, val);
    } else {
      var originType = getType(origin);//object or array or string
      var newType = getType(val);//object or array
      if (originType == 'object' && newType == 'object') {
        _.set(retval, dotKey, Object.assign(origin, val))
      } else {
        console.log('Lang key conflict with key:'+dotKey, origin, val);
        _.set(retval, dotKey, val)
      }

    }

  }
});

module.exports = retval;



