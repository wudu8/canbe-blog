import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../utils';

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: resultSuccess({
      token: '@string(64)',
      userInfo: {
        name: '@name(10)',
        avatar: '/sdsdas',
        job: '@ctitle(10)',
        organization: '@ctitle(10)',
        location: '@city(10)',
        email: '@email()',
        introduction: '@string(64)',
        personalWebsite: '@string(64)',
        jobName: '@string(64)',
        organizationName: '@string(64)',
        locationName: '@string(64)',
        phone: '@string(64)',
        registrationDate: '@string(64)',
        accountId: '@string(64)',
        certification: '@natural(10)',
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
        name: '@name(10)',
        avatar: '/sdsdas',
        job: '@ctitle(10)',
        organization: '@ctitle(10)',
        location: '@city(10)',
        email: '@email()',
        introduction: '@string(64)',
        personalWebsite: '@string(64)',
        jobName: '@string(64)',
        organizationName: '@string(64)',
        locationName: '@string(64)',
        phone: '@string(64)',
        registrationDate: '@string(64)',
        accountId: '@string(64)',
        certification: '@natural(10)',
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
