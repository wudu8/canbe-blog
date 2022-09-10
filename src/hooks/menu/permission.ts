import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export function usePermission() {
  const userStore = useUserStore();
  return {
    // 判断路由是否是否有权限
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(userStore.userInfo.role)
      );
    }
    // You can add any rules you want
  };
}
