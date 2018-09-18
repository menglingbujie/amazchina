const routes = (i18n) => {
  return [
    {
      path: '/article',
      index: "1",
      meta: { title: i18n('article["Article"]'), icon: 'article' },
      children: [
        {
          path: '/article#/list',
          index: "1-2",
          meta: { title: i18n('common["All Articles"]') },
        },
        {
          path: '/article#/create',
          index: "1-2",
          meta: { title: i18n('common["New Article"]') },
        },
      ]
    },
    {
      path: '/wait',
      index:"2",
      meta: { title: "Wait", icon: 'wait', }
    },
  ]
}
export default routes;
