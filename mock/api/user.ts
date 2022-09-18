import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../utils';

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: resultSuccess({
      token: '@string(64)',
      userInfo: {
        id: '@guid',
        realname: '@name(10)',
        avatar: '/sdsdas',
        email: '@email()',
        phone: '@string(64)',
        'sex|1': ['1', '2'],
        thirdId: '@guid',
        thirdType: '@guid',
        role: '老师'
      }
    })
  },
  {
    url: '/api/user/info',
    method: 'post',
    response: resultSuccess({
      token: '@string(64)',
      userInfo: {
        id: '@guid',
        realname: '@name(10)',
        avatar: '/sdsdas',
        email: '@email()',
        phone: '@string(64)',
        'sex|1': ['1', '2'],
        thirdId: '@guid',
        thirdType: '@guid',
        role: '老师'
      }
    })
  },
  {
    url: '/api/user/logout',
    method: 'post',
    response: resultSuccess(undefined)
  }
] as MockMethod[];
