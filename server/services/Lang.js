//use in node
var _ = require('lodash');
var watch = require('node-watch');
var glob = require('glob');

function reload(path) {
  var files = glob.sync(path + "/**/*", { nodir: true});
  var id = require.resolve(path);
  var oldCache = require.cache[id];
  _.forEach(files, (file)=>{
    let id = require.resolve(file);
    if (id) {
      delete require.cache[id];
    }
  })
  try {
    return require(id);
  } catch (e) {
    if (oldCache !== undefined) {
      require.cache[id] = oldCache; //restore the old cache since the new failed
    }
    throw e;
  }
  return null;
}


function isObject(val) {
  return Object.prototype.toString.call(val) == '[object Object]';
}

function flatObject(prefix, root, obj) {
  _.forEach(obj, function(val, key){
    if (isObject(val)) {
      flatObject(prefix + key + '.', root, val)
    } else {
      root[prefix + key] = val;
    }
  })
  return root;
}

//语言文件
function createLangMap(normalizeLang, languageMap) {

  return {
    languageMap: languageMap || {}, //key以.分割
    lang: normalizeLang,

    i18n(path, def) {
      let text = _.get(this.languageMap, path);
      let rettext = text;
      //匹配不到文案就用key作为文案
      if(!text){
        const matchArr = path.match(/.*\[.(.*).\]/);
        if (matchArr) {
          rettext = path.replace(/.*\[.(.*).\]/, '$1');
        } else {
          rettext = path.replace(/.*\./, '');
        }
      }
      return rettext;
    },

    flat(path, key, def) {
      var flatMap = _.get(this.languageMap, path + '.__flat', {});

      if (flatMap.hasOwnProperty(key)) {
        return flatMap[key];
      }
      return def || key;
    },

    /**
     * __flat指代flatMap
     *
     * key 形如 a.b,  a.b.c.__flat
     * */
    map(keys) {
      var map = {};
      var ret = {}
      keys = keys || [];

      _.forEach(keys, function(key) {
        var origin = {}

        var val = _.get(this.languageMap, key);
        if (isObject(val)) {

          if (key.endsWith('.__flat')) {//flatMap
            origin = val;
          } else {//非flatMap需要去除里面的__flat
            origin = flatObject(key + '.', {}, _.omit(val, '__flat'));
          }

        } else {
          origin[key] = val;
        }

        Object.assign(map, origin);
      }.bind(this))

      //ret[this.lang] = map;
      //return ret;
      return {
        map: map,
        keys: keys
      }
    }
  }
}

class LangFactory {
  constructor(defaultLangConfig, orignPath) {

    this.defaultLang = defaultLangConfig;
    this.originPath = orignPath;

    this.reload();

    watch(orignPath, { recursive: true }, (evt, filename) => {
      //console.log('Reload lang files', filename)
      this.reload();
      //console.log(this.get('en').i18n('space.forms.register.nickName'))
    });

  }

  reload() {
    this.fullLanguageMap = {};
    this.languageAliasMap = {};

    let originMap = reload(this.originPath);

    _.forEach(originMap, (langConfig, lang)=>{

      //handle alias
      this.languageAliasMap[lang] = lang;

      let props = langConfig['props'] || {};

      //处理alias
      if (props.hasOwnProperty('alias')) {
        let langAlias = props['alias'];
        if (typeof langAlias == 'string') {
          this.languageAliasMap[langAlias] = lang;
        } else {
          _.forEach(langAlias, (alia)=>{
            this.languageAliasMap[alia] = lang;
          })
        }
      }

      //处理语言文件
      let languageMap = Object.assign({},
        _.omit(langConfig, ['props']),
        props['extend'] || {}
      );


      this.fullLanguageMap[lang] = languageMap;
    });

    this.config = {
      alias: this.languageAliasMap,
      defaultLang: this.defaultLang
    }
  }

  get(lang) {
    var normalizeLang = this._normalizeLang(lang);

    var languageMap = this.fullLanguageMap[normalizeLang] || {};

    return createLangMap(normalizeLang, languageMap)

  }

  _normalizeLang(lang) {

    if (this.languageAliasMap.hasOwnProperty(lang)) {
      return this.languageAliasMap[lang];
    }

    return this.defaultLang;
  }

  _normalizeLegal(legal) {
    if (legal.content instanceof Array) {
      return legal;
    }
    return {
      title: legal.title,
      content: legal.content.split('\n')
    }
  }
}

function createLangFactory(defaultLangConfig, orignPath) {
  return new LangFactory(defaultLangConfig, orignPath);
}

module.exports = createLangFactory;
