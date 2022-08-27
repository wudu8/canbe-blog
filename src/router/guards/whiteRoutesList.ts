import { sortRoutes } from '@/router/utils';
import { flattenTree } from '@/utils/treeUtils';
import { type RouteRecordRaw } from 'vue-router';

const allModules = import.meta.globEager('@/router/routes/commons/*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

export const whiteRoutes = sortRoutes(moduleRoutes);
export const whiteName = flattenTree(whiteRoutes, item => item.name);
