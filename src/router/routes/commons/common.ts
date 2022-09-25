import type { RouteRecordRaw } from 'vue-router';
import { pathEnum } from '@/router/path';
import { EmptyLayout, PortalLayout } from '@/layouts';
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
        name: 'login',
        meta: {
          title: t('route.login.title'),
          sort: 1
        },
        component: () => import('@/views/login/Index.vue')
      }
    ]
  },
  {
    path: '/common_portal',
    name: 'common_portal',
    component: PortalLayout,
    children: [
      {
        path: pathEnum.detailsArticle,
        name: 'details-article',
        meta: {
          title: t('route.article_detail.title'),
          browserTitle: '',
          sort: 1
        },
        component: () => import('@/views/portal/article/Index.vue')
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
