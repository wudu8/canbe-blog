import type { Router } from 'vue-router';

import { usePermission } from '@/hooks';

export default function (router: Router): void {
  router.beforeEach((to, _, next) => {
    if (!router.hasRoute(to.name || '')) {
      router.push('/exception/not_found');
      return;
    }
    // 权限控制
    const Permission = usePermission();
    const permissionsAllow = Permission.accessRouter(to);
    if (permissionsAllow) next();
    else {
      next();
    }
  });
}
