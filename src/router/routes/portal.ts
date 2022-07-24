import type { RouteRecordRaw } from 'vue-router';
import { PortalLayout } from '@/layouts';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
