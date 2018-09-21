const routes = (i18n) => {
  return [
    {
      path: '/article',
      index: "1",
      meta: { title: i18n('article["Article"]'), icon: 'wenzhang' },
      children: [
        {
          path: '/article#/list',
          index: "1-1",
          meta: { title: i18n('common["All Articles"]')},
        },
        {
          path: '/article#/create',
          index: "1-2",
          meta: { title: i18n('common["New Article"]')},
        },
      ]
    },
    {
      path: '/label',
      index:"2",
      meta: { title: i18n('common["Label Manager"]'), icon: 'label', }
    },
  ]
}
export default routes;
