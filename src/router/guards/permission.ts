import type { Router } from 'vue-router';

import { whitePath } from './whiteRoutesList';

export default function (router: Router): void {
  router.beforeEach(guard => {
    // white list
    if (whitePath.includes(guard.path)) {
      return;
    }
    if (!router.hasRoute(guard.name || '')) {
      router.push('/exception/404');
    }
  });
}
