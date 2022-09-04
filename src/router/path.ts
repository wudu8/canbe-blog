/**
 * 路由path
 */

const protalPathEnum = {
  home: '/',
  editArticle: '/article/edit_article',
  drafts: '/article/drafts'
};

const adminPathEnum = {};

const commonPathEnum = {
  common: '/common',
  login: '/login'
};

const exceptionPathEnum = {
  notFound: '/exception/not_found'
};
export const pathEnum = {
  ...protalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum,
  ...commonPathEnum
};

export type PathEnum = typeof pathEnum;
