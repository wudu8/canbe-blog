import { sortRoutes } from '@/router/utils';
import { concat } from 'lodash-es';
import { type RouteRecordRaw } from 'vue-router';
import { whiteRoutes } from '../guards/whiteRoutesList';
import protalRoutes from './commons/portal';

const allModules = import.meta.globEager('./modules/*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

// 导出
export const protalMenus = [...protalRoutes];

export default concat(sortRoutes(moduleRoutes), whiteRoutes);
