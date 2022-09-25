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
  ...portalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum,
  ...commonPathEnum
};

export type PathEnum = typeof pathEnum;
