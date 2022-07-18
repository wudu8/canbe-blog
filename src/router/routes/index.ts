import { sortRoutes } from '@/router/utils';
import { concat } from 'lodash-es';
import { type RouteRecordRaw } from 'vue-router';
import { whiteRoutes } from '../guards/whiteRoutesList';

const allModules = import.meta.globEager('./modules/*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});
export default concat(sortRoutes(moduleRoutes), whiteRoutes);
