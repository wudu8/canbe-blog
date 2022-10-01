/*
 * @Author: zkr
 * @Description: vue3实战项目
 * @Date: 2022-08-07 18:18:51
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-29 16:05:23
 * @FilePath: \canbe-blog\src\router\path.ts
 */
/**
 * 路由path
 */

// 门户导航路由
export const portalHeaderPathEnum = {
  /** 首页 */
  home: '/',
  /** 站长工具 */
  WebmasterTools: '/tools',
  /** 生态产品 */
  openSource: '/development',
  /** 关于我们 */
  aboutUs: '/about_us'
};

// 门户 创作者中心 路由
export const creatorPathEnum = {
  /** 创作者中心 */
  creator: '/creator',
  /** 创作者中心-首页 */
  creatorHome: '/creator/home',
  /** 草稿箱 */
  drafts: '/creator/drafts',
  /** 文章管理 */
  creatorArticle: '/creator/article',
  /** 专栏管理 */
  creatorColumn: '/creator/column'
};

// 门户 个人中心 路由
const personalPathEnum = {
  /* 个人中心 */
  personal: '/user',
  /* 个人中心首页 */
  personalHome: '/user/home',
  /* 修改资料 */
  personalSetting: '/user/settings',
  /* 修改个人信息 */
  infoSetting: '/user/settings/profile',
  /* 修改账户信息 */
  accountSetting: '/user/settings/account'
};

// 门户权限控制路由
const portalPathEnum = {
  /** 编辑文章页面 */
  editArticle: '/article/edit',
  userhomepage: '/user/homepage'
};

// 管理端权限控制路由
const adminPathEnum = {};

// 公共路由
const commonPathEnum = {
  /** 登录页面 */
  login: '/login',

  /** 门户公共路由 */
  /** 文章详情页 */
  detailsArticle: '/article/details/:id'
};

// 异常跳转路由
const exceptionPathEnum = {
  /** 404页面 */
  notFound: '/exception/not_found'
};
export const pathEnum = {
  ...creatorPathEnum,
  ...portalHeaderPathEnum,
  ...personalPathEnum,
  ...portalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum,
  ...commonPathEnum
};

export type PathEnum = typeof pathEnum;
