/**
 * 路由path
 */

const protalPathEnum = {
  home: '/',
  edit_article: '/edit_article'
};

const adminPathEnum = {};

const exceptionPathEnum = {
  notFound: '/exception/not_found'
};
export const pathEnum = {
  ...protalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum
};

export type PathEnum = typeof pathEnum;
