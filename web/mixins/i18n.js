/**
 * Created by Xuzhe on 2016/11/22.
 */
import langService from '../utils/lang';

export default {
  beforeCreate() {

    this.$lang = langService;
    //console.log('beforeCreate lang', this.$lang);
  },
  methods: {
    i18n: function (key) {
      const result = this.$lang.i18n(key);
      //console.log('i18n', key, result);
      return result
    }
  }
}