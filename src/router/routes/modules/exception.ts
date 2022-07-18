import { type RouteRecordRaw } from 'vue-router';
import { pathEnum } from '@/router/path';

const routeName = 'exception',
  routes: Array<RouteRecordRaw> = [
    {
      path: '/exception',
      name: routeName,
      meta: {
        title: '异常页面',
        sort: 10,
        icon: 'exception'
      },
      redirect: pathEnum.notFound,
      children: [
        {
          path: pathEnum.notFound,
          name: `${routeName}-404`,
          meta: {
            title: '404',
            sort: 0,
            icon: 'question'
          },
          component: () => import('@/views/exception/404.vue')
        }
      ]
    }
  ];

export default routes;
