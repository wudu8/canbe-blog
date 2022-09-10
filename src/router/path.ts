/**
 * 路由path
 */

// 门户导航路由
export const protalMenusEnum = {
  home: '/',
  WebmasterTools: '/tools',
  openSource: '/development',
  aboutUs: '/about_us'
};

// 门户权限控制路由
const protalPathEnum = {
  editArticle: '/article/edit',
  drafts: '/article/drafts'
};

// 管理端权限控制路由
const adminPathEnum = {};

// 公共路由
const commonPathEnum = {
  common: '/common',
  login: '/login'
};

// 异常跳转路由
const exceptionPathEnum = {
  notFound: '/exception/not_found'
};
export const pathEnum = {
  ...protalMenusEnum,
  ...protalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum,
  ...commonPathEnum
};

export type PathEnum = typeof pathEnum;
