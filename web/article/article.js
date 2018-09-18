
import '../bootstrap_web';
import Vue from 'vue';

import router from './router';
import ArticleFrame from './ArticleFrame.vue';
import store from '../modules/article';
new Vue({
  store,
  router,
  render:h=>h(ArticleFrame)
  
}).$mount('#rootArticle');