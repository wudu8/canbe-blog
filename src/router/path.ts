/**
 * 路由path
 */

const protalPathEnum = {
  home: '/',
  md: '/md'
};

const adminPathEnum = {};

const exceptionPathEnum = {
  notFound: '/exception/404'
};
export const pathEnum = {
  ...protalPathEnum,
  ...adminPathEnum,
  ...exceptionPathEnum
};

export type PathEnum = typeof pathEnum;
