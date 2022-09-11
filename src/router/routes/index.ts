import { sortRoutes } from '@/router/utils';
import { concat } from 'lodash-es';
import { type RouteRecordRaw } from 'vue-router';
import { whiteRoutes } from '../guards/whiteRoutesList';
import protalRoutes from './commons/portal';
import creatorRoutes from './modules/creator';

const allModules = import.meta.globEager('./modules/*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(allModules).forEach(key => {
  const mod = allModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

// 导出首页导航菜单
export const protalMenus = [...sortRoutes(protalRoutes)];
// 导出创作者中心菜单
export const creatorMenus = [...sortRoutes(creatorRoutes[0].children ?? [])];

export default concat(sortRoutes(moduleRoutes), whiteRoutes);
