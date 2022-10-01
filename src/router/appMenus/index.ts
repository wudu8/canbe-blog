/*
 * @Author: zkr
 * @Date: 2022-09-19 14:16:36
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-30 11:27:59
 * @FilePath: \canbe-blog\src\router\appMenus\index.ts
 */
import type {
  RouteRecordRaw,
  RouteMeta,
  RouteRecordRedirectOption,
  RouteRecordName
} from 'vue-router';

import { mapTree } from '@/utils/treeUtils';
import { portalNavRoutes, creatorRoutes, adminRoutes } from '../routes';

export interface AppMenu {
  name?: RouteRecordName;
  path: string;
  meta?: RouteMeta;
  redirect?: RouteRecordRedirectOption;
  children?: AppMenu[];
}

function getMenus(raw: RouteRecordRaw): AppMenu {
  const { name, path, meta, redirect, children } = raw;
  return {
    name,
    path,
    meta,
    redirect,
    children
  };
}

/**
 * 门户端菜单
 */
export const portalNavMenus = mapTree<RouteRecordRaw, AppMenu>(portalNavRoutes, getMenus);

/**
 * 创作者中心菜单
 */
export const creatorMenus = mapTree<RouteRecordRaw, AppMenu>(creatorRoutes, getMenus);

/**
 * 管理端菜单
 */
export const adminMenus = mapTree<RouteRecordRaw, AppMenu>(adminRoutes, getMenus);
