/* eslint-disable callback-return */
import type { Router, LocationQueryRaw, RouteLocationNormalized } from 'vue-router';

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';
import { whiteName } from './whiteRoutesList';

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
    // white list

    if (isLogin()) {
      if (userStore.userInfo.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          if (to.name && whiteName.includes(to.name)) {
            next();
            return;
          } else {
            next(getRedirectParams(to));
          }
        }
      }
    } else {
      if (to.name && whiteName.includes(to.name)) {
        next();
        return;
      } else {
        next(getRedirectParams(to));
      }
    }
  });
}
