import type { Router } from 'vue-router';

import { whitePath } from './whiteRoutesList';
import NProgress from 'nprogress'; // progress bar

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

  router.afterEach(guard => {
    document.title = guard?.meta?.title ? `${document.title}-${guard.meta.title}` : document.title;
    NProgress.done();
  });

  router.onError((error, to, from) => {
    // eslint-disable-next-line no-console
    console.error(error, from, to);
    NProgress.done();
  });
}
