/**
 * 公共区域
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

Vue.mixin(require('./mixins/i18n').default);

// polyfill
if (!String.prototype.format) {
  String.prototype.format = function () {
    var str = this.toString();
    if (!arguments.length)
      return str;
    var args = typeof arguments[0],
      args = (("string" == args || "number" == args) ? arguments : arguments[0]);
    // for (arg in args)
    if(!args){return str;}
    for (var i = 0; i < args.length; i++)
      str = str.replace(RegExp("\\{" + i + "\\}", "gi"), args[i]);
    return str;
  }
}
