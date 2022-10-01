/*
 * @Author: zkr
 * @Date: 2022-08-07 18:18:51
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-30 11:28:05
 * @FilePath: \canbe-blog\src\router\routes\index.ts
 */
import { sortRoutes } from '@/router/utils';
import { concat } from 'lodash-es';
import { type RouteRecordRaw } from 'vue-router';
import { adminwhiteRoutes, whiteRoutes } from '../guards/whiteRoutesList';
import portalCommon from './commons/portalCommon';
import creator from './portal/creator';

const portalModules = import.meta.glob('./portal/*.ts', { import: 'default', eager: true });
const adminModules = import.meta.glob('./modules/*.ts', { import: 'default', eager: true }),
  moduleRoutes: RouteRecordRaw[] = [];

Object.keys(portalModules).forEach(key => {
  const mod = portalModules[key] || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});
Object.keys(adminModules).forEach(key => {
  const mod = adminModules[key] || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];

  moduleRoutes.push(...modList);
});

// 首页顶部导航菜单
export const portalNavRoutes = [...sortRoutes(portalCommon)];
// 导出创作者中心菜单
export const creatorRoutes = [...sortRoutes(creator[0].children ?? [])];

// 管理端菜单
export const adminRoutes = concat(sortRoutes(moduleRoutes), adminwhiteRoutes);

// 导出所有菜单 首页顶部导航/创作者中心菜单/管理端菜单
export default concat(sortRoutes(moduleRoutes), whiteRoutes);
