import mockjs from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../utils';

export default [
  {
    url: '/api/article/list',
    method: 'get',
    timeout: 500,
    response: () => {
      return resultSuccess(
        mockjs.mock({
          'array|10-12': [
            {
              id: '@guid',
              title: '@cword(20)',
              articlePath: '@url()',
              description: '@paragraph',
              viewNum: '@integer(60, 10000)',
              likeNum: '@integer(60, 10000)',
              commentNum: '@integer(60, 10000)',
              author: '@cname',
              dateTime: '@date',
              tags: ['前端', 'js']
            }
          ]
        }).array
      );
    }
  },
  {
    url: '/api/article/type',
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
    url: '/api/article/get_article',
    method: 'get',
    response: resultSuccess({
      id: '@character(10)',
      title: '@ctitle(10)',
      content:
        '<p><img src="https://picsum.photos/302" alt="图片" data-href="https://picsum.photos/300/2" style=""/><img src="https://picsum.photos/303" alt="图片" data-href="https://picsum.photos/300/2" style=""/></p>',
      mode: 'rich'
    })
  }
] as MockMethod[];
