import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
      sort: 1
    },
    component: () => import('@/views/Home.vue')
    // children: [],
  }
];

export default routes;
