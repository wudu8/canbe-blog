import type { RouteRecordRaw } from 'vue-router';
import { pathEnum } from '@/router/path';
import { EmptyLayout } from '@/layouts';
import { t } from '@/locale';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/common',
    name: 'common',
    redirect: pathEnum.login,
    component: EmptyLayout,
    children: [
      {
        path: pathEnum.login,
        name: 'Login',
        meta: {
          title: t('route.login.title'),
          sort: 1
        },
        component: () => import('@/views/login/Index.vue')
      }
    ]
  }
  // {
  //   path: '/register',
  //   name: 'Register',
  //   meta: {
  //     title: '注册',
  //   },
  //   component: () => import('@/views/register/Index.vue'),
  // },
];

export default routes;
