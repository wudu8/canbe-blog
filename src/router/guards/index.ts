import type { Router } from 'vue-router';

import NProgress from 'nprogress'; // progress bar
import { setRouteEmitter } from '@/utils/route-listener';
// import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async to => {
    NProgress.start(); // start progress bar
    // emit route change
    setRouteEmitter(to);
  });
}

export default function createRouterGuards(router: Router) {
  setupPageGuard(router);
  // setupUserLoginInfoGuard(router);
  setupPermissionGuard(router);
}
