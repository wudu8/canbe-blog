/**
 * 配置多页面env环境变量注入到html
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import { getCommonHtmlEnv } from '../utils';

export default function configHtmlPlugin(env: ImportMetaEnv, _isBuild: boolean) {
  const htmlPlugin = createHtmlPlugin({
    // 是否压缩 html
    minify: true,
    // 多页配置
    pages: [
      {
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */

        entry: 'src/main.ts',
        filename: 'index.html',
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: 'index.html',
        // 注入 HTML 的数据
        injectOptions: {
          data: getCommonHtmlEnv(env, 'front')
        }
      },
      {
        entry: 'src/main.ts',
        filename: 'admin.html',
        template: 'admin.html',
        injectOptions: {
          data: getCommonHtmlEnv(env, 'admin')
        }
      }
    ]
  });
  return htmlPlugin;
}
