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
  }
];

export default routes;
