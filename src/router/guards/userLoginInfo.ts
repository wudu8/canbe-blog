/* eslint-disable callback-return */
import type { Router, LocationQueryRaw, RouteLocationNormalized } from 'vue-router';

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

function getRedirectParams(to: RouteLocationNormalized) {
  return {
    name: 'login',
    query: {
      redirect: to.name,
      ...to.query
    } as LocationQueryRaw
  };
}

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const userStore = useUserStore();
    if (isLogin()) {
      if (userStore.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          next(getRedirectParams(to));
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        return;
      }
      next(getRedirectParams(to));
    }
  });
}
