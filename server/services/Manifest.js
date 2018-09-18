/**
 * Created by Xuzhe on 2016/12/19.
 */
var _ = require('lodash');
var watch = require('node-watch');
var glob = require('glob');
var Path = require('path');
var FS = require('fs');
var utils = require('./utils');

class Manifest {
  constructor(resourceRoot, publicRoot) {
    this.resourceRoot = resourceRoot;
    this.publicRoot = publicRoot;
    this.fileMap = {};

    this.reload();

    this.timer = null;

    if (utils.isEnvProduct()) {
      watch(this.resourceRoot, { recursive: true }, (evt, filename)=>{
        this.delayReload();
      });
    } else {
      watch(this.resourceRoot, { recursive: true }, (evt, filename)=>{
        this.reload();
      });
    }
  }

  delayReload() {
    if (this.timer) {
      return;
    }
    this.timer = setTimeout(()=>{
      this.timer = null;
      this.reload();
    }, 500)
  }

  reload() {
    this.fileMap = {};
    const files = glob.sync(this.resourceRoot + "/**/*", { nodir: true});

    _.forEach(files, (path)=>{
      const result_name = Path.relative(this.resourceRoot, path).replace(/\\/g, '/');
      //const matched = /([\w-_/]+)(\.([0-9a-z]{7}))?(\.\w+)/.exec(result_name);
      const matched = /([^\.]+)(\.([0-9a-z]{7}))(\.\w+)/.exec(result_name);

      if (matched) {
        const origin_name = matched[1] + matched[4];

        let mtime;
        try {
          const stats = FS.statSync(path);
          if (!stats) {
            return;
          }
          mtime = stats.mtime.valueOf();
        } catch(e) {
          return;
        }

        if (this.fileMap.hasOwnProperty(origin_name)) {

          if (mtime > this.fileMap[origin_name].mtime) {
            this.fileMap[origin_name] = { name: result_name, mtime: mtime};
          }
        } else {
          this.fileMap[origin_name] = { name: result_name, mtime: mtime};
        }
      }

    })

  }

  resolveFile(origin) {
    if (this.fileMap.hasOwnProperty(origin)) {
      return this.fileMap[origin].name;
    }
    return origin;
  }

  setPublicRoot(path) {
    this.publicRoot = path;
  }

  getPublicRoot() {
    const type = utils.getType(this.publicRoot);
    if (type == 'string') {
      return this.publicRoot;
    } else if (type == 'function') {
      return this.publicRoot();
    } else {
      return '';
    }
  }

  resource(origin) {
    const name = this.resolveFile(origin);
    return this.getPublicRoot() + name;
  }
}

module.exports = function(dir, callback) {
  return new Manifest(dir, callback)
};
