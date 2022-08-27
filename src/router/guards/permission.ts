import type { Router } from 'vue-router';

import { whiteName } from './whiteRoutesList';

export default function (router: Router): void {
  router.beforeEach((to, _, next) => {
    // white list
    if (to.name && whiteName.includes(to.name)) {
      next();
      return;
    }
    if (!router.hasRoute(to.name || '')) {
      router.push('/exception/not_found');
    }
  });
}
