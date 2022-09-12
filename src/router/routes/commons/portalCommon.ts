import type { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { PortalLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.home,
    name: 'home',
    meta: {
      title: t('portal.home_page.title'),
      browserTitle: t('portal.home.title'),
      showSystemTitle: true,
      sort: 1
    },
    component: PortalLayout,
    children: [
      {
        path: pathEnum.WebmasterTools,
        name: 'Webmaster_tools',
        meta: {
          title: t('portal.Webmaster_tools.title'),
          sort: 1
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: pathEnum.openSource,
        name: 'open_source',
        meta: {
          title: t('portal.open_source.title'),
          sort: 2
        },
        component: () => import('@/views/exception/404.vue')
      },
      {
        path: pathEnum.aboutUs,
        name: 'about_us',
        meta: {
          title: t('portal.about_us.title'),
          sort: 3
        },
        component: () => import('@/views/exception/404.vue')
      }
    ]
  }
];

export default routes;
