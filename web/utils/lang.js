/**
 * Created by Xuzhe on 2016/11/18.
 */
import Vue from 'vue';
import utils from './utils';
import _ from 'lodash';
import http from 'axios';

let data = AmazChina.initalState;

data.notFoundKeys = {};
data.inLoading = [];
let vm = new Vue({
  data,
  methods: {
    i18n(key, def) {
      let langMap = this.langMap;
      let val = _.get(langMap, key);
      //add observer point
      const matchArr = key.match(/.*\[.(.*).\]/);
      if (val) {
        delete this.notFoundKeys[key];
        return val;
      }
      let text = key;
      if (matchArr) {
        text = key.replace(/.*\[.(.*).\]/, '$1');
      } else {
        text = key.replace(/.*\./, '');
      }
      Vue.set(langMap, text, text);
      return text;
    },

    load(keys) {
      let keyType = utils.getType(keys);
      let preload = [];
      if (keyType == 'string') {
        preload = [keys];
      } else {
        preload = keys;
      }

      let needload = _.differenceWith(preload, _.concat(this.langMap.keys, this.inLoading), (preVal, othVal)=>{
        return preVal == othVal || preVal.startsWith(othVal)
      });

      if (needload.length == 0) {
        return Promise.resolve();
      }

      return this.fetchLangMap(this.lang, needload);
    },
    change(lang) {
      if (!lang || lang == this.lang) {
        return Promise.resolve();
      }

      return this.fetchLangMap(lang, this.langMap.keys).then(()=>{
        this.lang = lang;
      })
    },
    fetchLangMap(lang, keys) {
      let pages = keys.join(',')
      this.inLoading = _.concat(this.inLoading, keys);

      return http.get(`/i18n?lang=${lang}&pages=${pages}`).then((response)=>{
        const data = response.data;
        this.langMap.keys = _.concat(this.langMap.keys, keys);
        this.inLoading = _.difference(this.inLoading, keys);

        Object.assign(this.langMap, data.map);

      })
    }
  }
})

export default vm;
