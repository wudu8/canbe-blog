import type { RouteRecordRaw } from 'vue-router';

import { t } from '@/locale';
import { PortalLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.home,
    name: 'home',
    meta: {
      title: t('protal.home.title'),
      sort: 1
    },
    component: PortalLayout,
    children: []
  },
  {
    path: pathEnum.edit_article,
    name: 'edit_article',
    meta: {
      title: t('protal.edit_article.title'),
      sort: 1
    },
    component: () => import('@/views/portal/editor/Index.vue')
  }
];

export default routes;
