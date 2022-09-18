import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import type { ComputedRef } from 'vue';
import type { AppMenu } from '@/router/appMenus';

import { computed } from 'vue';
import { isEmpty } from 'lodash-es';
import { usePermission } from './permission';

export function useMenuTree(appRouteRef: ComputedRef<AppMenu[]>) {
  const permission = usePermission();
  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRouteRef.value));
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return ((a.meta.order as number) || 0) - ((b.meta.order as number) || 0);
    });
    function travel(_routes: RouteRecordRaw[], layer: number): RouteRecordRaw[] {
      if (!_routes) return [];

      const collector: (RouteRecordRaw | null)[] = _routes.map(element => {
        // 判断路由是否是否有权限
        if (!permission.accessRouter(element)) {
          return null;
        }

        // 叶子节点直接返回
        if (element.meta?.hideChildrenInMenu || isEmpty(element.children)) {
          element.children = [];
          return element;
        }

        // 过滤 hideInMenu = true的路由
        element.children = element.children?.filter(x => x.meta?.hideInMenu !== true) || [];

        // 处理孩子节点
        const subItem = travel(element.children, layer + 1);

        if (subItem.length) {
          element.children = subItem;
          return element;
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem;
          return element;
        }

        if (element.meta?.hideInMenu === false) {
          return element;
        }

        return null;
      });
      return collector.filter(Boolean) as RouteRecordRaw[];
    }
    return travel(copyRouter, 0);
  });

  return {
    menuTree
  };
}
