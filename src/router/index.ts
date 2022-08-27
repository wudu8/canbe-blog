import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import createRouterGuards from './guards';
import routes from './routes';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  routes,
  history: createWebHashHistory(),
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

export function setupRouter(app: App<Element>): void {
  app.use(router);
  createRouterGuards(router);
}

export * from './path';

export default router;
