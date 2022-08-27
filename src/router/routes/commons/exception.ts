import { type RouteRecordRaw } from 'vue-router';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.notFound,
    name: 'exception',
    meta: {
      title: '异常页面',
      sort: 10
    },
    redirect: pathEnum.notFound,
    children: [
      {
        path: pathEnum.notFound,
        name: `exception-404`,
        meta: {
          title: '404',
          sort: 0
        },
        component: () => import('@/views/exception/404.vue')
      }
    ]
  }
];

export default routes;
