import type { RouteComponent, RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  export interface RouteMeta {
    /** 菜单名称  */
    title?: string;

    /** 浏览器title，如果不配置，将默认使用title属性 */
    browserTitle?: string;

    /** 当前路由是否在浏览器标签栏上显示系统名称 */
    showSystemTitle?: boolean;

    icon?: string;

    /** 缓存页面 管理端多标签模式生效 */
    keepAlive?: boolean;
    /** 是否隐藏当前菜单及叶子菜单 */
    hideInMenu?: boolean;
    /** 是否隐藏叶子菜单 */
    hideChildrenInMenu?: boolean;

    /** 菜单显示排序
     *
     * 菜单项在各自父级菜单中排序，越小越靠前
     *
     * @scope { 1 - 999 }
     */
    sort?: number;
    /** 路由访问权限标识 */
    roles?: string[]; // 角色权限控制
  }
}
