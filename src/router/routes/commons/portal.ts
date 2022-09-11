import type { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { PortalLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.home,
    name: 'home',
    meta: {
      title: t('protal.home_page.title'),
      browserTitle: t('protal.home.title'),
      showSystemTitle: true,
      sort: 1
    },
    component: PortalLayout,
    children: [
      {
        path: pathEnum.WebmasterTools,
        name: 'Webmaster_tools',
        meta: {
          title: t('protal.Webmaster_tools.title'),
          sort: 1
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: pathEnum.openSource,
        name: 'open_source',
        meta: {
          title: t('protal.open_source.title'),
          sort: 2
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: pathEnum.aboutUs,
        name: 'about_us',
        meta: {
          title: t('protal.about_us.title'),
          sort: 3
        },
        component: () => import('@/views/exception/404.vue')
      }
    ]
  }
];

export default routes;
