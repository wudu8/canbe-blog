import { sortRoutes } from '@/router/utils';
import { concat } from 'lodash-es';
import { type RouteRecordRaw } from 'vue-router';
import { adminwhiteRoutes, whiteRoutes } from '../guards/whiteRoutesList';
import portalNavRoutes from './commons/portalCommon';
import creatorRoutes from './portal/creator';

const portalModules = import.meta.globEager('./portal/*.ts');
const adminModules = import.meta.globEager('./modules/*.ts'),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(portalModules).forEach(key => {
  const mod = portalModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});
Object.keys(adminModules).forEach(key => {
  const mod = adminModules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

// 首页顶部导航菜单
export const portalNavMenus = [...sortRoutes(portalNavRoutes)];
// 导出创作者中心菜单
export const creatorMenus = [...sortRoutes(creatorRoutes[0].children ?? [])];

// 管理端菜单
export const adminMenus = concat(sortRoutes(moduleRoutes), adminwhiteRoutes);

// 导出所有菜单 首页顶部导航/创作者中心菜单/管理端菜单
export default concat(sortRoutes(moduleRoutes), whiteRoutes);
