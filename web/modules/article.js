/**
 * Created by menglj on 2018/09/18.
 */
import Vuex from 'vuex';

import articleStore from "./article/store.js";
import interactiveStore from "./interactive/store.js";
import accountStore from "./account/store.js";
import userStore from "./user/store.js";
// import globalStore from "./global/store.js";
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    article: articleStore,
    interactive: interactiveStore,
    account:accountStore,
    user: userStore,
    // global:globalStore,
  },
  strict: process.env.NODE_ENV !== 'production'

});
