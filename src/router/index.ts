import { createRouterGuards } from './guards';
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: (to, _, savedPosition) => {
    if (savedPosition) {
      // 后退才有savedPosition
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0, behavior: 'smooth' };
  }
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  createRouterGuards(router);
}

export default router;
