import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/list',
      component: () => require('./views/ArticleList.vue')
    },
    {
      path: '/create',
      component: () => require('./views/ArticleCreate.vue')
    },
    { path: '*', redirect: '/list' }
  ]
})

export default router;
