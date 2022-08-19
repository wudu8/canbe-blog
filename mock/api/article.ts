import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../utils';

export default [
  {
    url: '/api/article/list',
    method: 'get',
    timeout: 500,
    response: () => {
      return resultSuccess([
        {
          id: 1,
          title: '前端',
          articlePath: 'sdads',
          description: '啊实打实大苏打实打实大苏打实打实的',
          viewNum: 215,
          likeNum: 354,
          commentNum: 183,
          author: '字节猿',
          dateTime: '2022-05-12',
          tags: ['前端', 'js']
        },
        {
          id: 2,
          title:
            '啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的啊实打实大苏打实打实大苏打实打实的实大苏打实打实大苏打实打实的',
          articlePath: 'qweqdsz',
          description: '啊实打实大苏打实打实大苏打实打实的',
          viewNum: 215,
          likeNum: 354,
          commentNum: 183,
          author: '字节猿',
          dateTime: '2022-05-12',
          tags: ['前端', 'js'],
          beforeTag: {
            color: 'red',
            label: '原力计划'
          },
          afterTag: {
            color: 'red',
            label: '千次阅读'
          }
        },
        {
          id: 3,
          title: 'Java',
          articlePath: 'afgdfds',
          description: '啊实打实大苏打实打实大苏打实打实的',
          viewNum: 215,
          likeNum: 354,
          commentNum: 183,
          author: '字节猿',
          dateTime: '2022-05-12',
          tags: ['前端', 'js']
        }
      ]);
    }
  },
  {
    url: '/api/article/type',
    method: 'get',
    timeout: 500,
    response: resultSuccess([
      {
        id: 1,
        name: '前端',
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
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';

      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  }
] as MockMethod[];
