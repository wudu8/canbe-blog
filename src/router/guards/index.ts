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
  router.afterEach(guard => {
    document.title = guard?.meta?.customTitle
      ? guard.meta.customTitle
      : guard?.meta?.title && window?.systemOptions?.title
      ? `${window.systemOptions.title} - ${guard.meta.title}`
      : document.title;
  });
}
function endPageGuard(router: Router): void {
  router.afterEach(() => {
    NProgress.done();
  });

  router.onError((error, to, from) => {
    // eslint-disable-next-line no-console
    console.error(error, from, to);
    NProgress.done();
  });
}

export default function createRouterGuards(router: Router) {
  // 路由初始化处理
  setupPageGuard(router);

  // 路由跳转逻辑处理
  // setupUserLoginInfoGuard(router);
  setupPermissionGuard(router);

  // 路由结束处理
  endPageGuard(router);
}
