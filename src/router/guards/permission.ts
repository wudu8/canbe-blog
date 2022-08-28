import type { Router } from 'vue-router';

import { whiteName } from './whiteRoutesList';

export default function (router: Router): void {
  router.beforeEach((to, _, next) => {
    // white list
    if (to.name && whiteName.includes(to.name)) {
      next();
      return;
    } else {
      if (!router.hasRoute(to.name || '')) {
        router.push('/exception/not_found');
        return;
      }
      // 权限控制
      next();
      return;
    }
  });
}
