import type { requestParams } from '../utils';

import mockjs from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../utils';

export default [
  {
    url: '/api/blog/blogInfo',
    method: 'get',
    timeout: 500,
    response: (request: requestParams) => {
      const { blogStatus = '1' } = request.body;
      return resultSuccess(
        mockjs.mock({
          'array|10-12': [
            {
              id: '@guid',
              blogTitle: '@ctitle(20)',
              description: '@cparagraph',
              readingNum: '@integer(60, 10000)',
              favourNum: '@integer(60, 10000)',
              commentNum: '@integer(60, 10000)',
              storeNum: '@integer(60, 10000)',
              blogAuthor: '@cname',
              blogCategory: '@cword(5)',
              blogContent: '@cparagraph',
              'blogEditType|1': ['1', '2'],
              blogStatus: blogStatus,
              blogTags: ['前端', 'js'],
              publishTime: '@datetime',
              createBy: '@cname',
              createTime: '@datetime',
              delFlag: '0',
              updateBy: '@cname',
              updateTime: '@datetime'
            }
          ]
        }).array
      );
    }
  },
  {
    url: '/api/system/sysDictItem/hotCategory',
    method: 'get',
    timeout: 500,
    response: resultSuccess([
      {
        id: 1,
        name: '@ctitle(10)',
        num: 503
      },
      {
        id: 2,
        name: '后端',
        num: 3564
      },
      {
        id: 3,
        name: 'Java',
        num: 14
      }
    ])
  },
  {
    url: '/api/blog/blogInfo/:id',
    method: 'get',
    response: resultSuccess({
      id: '@guid',
      blogTitle: '@ctitle(20)',
      description: '@cparagraph',
      readingNum: '@integer(60, 10000)',
      favourNum: '@integer(60, 10000)',
      commentNum: '@integer(60, 10000)',
      storeNum: '@integer(60, 10000)',
      blogAuthor: '@cname',
      blogCategory: '@cword(5)',
      blogContent: '@cparagraph',
      'blogEditType|1': ['1', '2'],
      blogStatus: '1',
      blogTags: ['前端', 'js'],
      publishTime: '@datetime',
      createBy: '@cname',
      createTime: '@datetime',
      delFlag: '0',
      updateBy: '@cname',
      updateTime: '@datetime'
    })
  },
  {
    url: '/api/blog/blogInfo/:id/incrFavourNum',
    method: 'patch',
    response: resultSuccess(true)
  }
] as MockMethod[];
