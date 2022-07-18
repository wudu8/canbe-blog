import type { RouteRecordRaw } from 'vue-router';
import { PortalLayout } from '@/layouts';
import { pathEnum } from '@/router/path';

const routes: Array<RouteRecordRaw> = [
  {
    path: pathEnum.home,
    name: 'home',
    meta: {
      title: 'home',
      sort: 1
    },
    component: PortalLayout,
    // component: () => import('@/views/Home.vue')
    children: []
  }
];

export default routes;
