import { sortRoutes } from '@/router/utils';
import { flattenTree } from '@/utils/treeUtils';
import { type RouteRecordRaw } from 'vue-router';

const allModules = import.meta.glob('@/router/routes/commons/*.ts', {
    import: 'default',
    eager: true
  }),
  moduleRoutes: RouteRecordRaw[] = [],
  adminModuleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key] || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  if (key.indexOf('portalCommon') === -1) {
    adminModuleRoutes.push(...modList);
  }
  moduleRoutes.push(...modList);
});

export const whiteRoutes = sortRoutes(moduleRoutes);
export const adminwhiteRoutes = sortRoutes(adminModuleRoutes);
export const whiteName = flattenTree(whiteRoutes, item => item.name);
