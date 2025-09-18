/*
 * @Author: wudu8 y2386166796@163.com
 * @Date: 2023-11-25 19:39:36
 * @LastEditors: wudu8 y2386166796@163.com
 * @LastEditTime: 2025-09-18 23:42:07
 * @FilePath: \canbe-blog\config\modules\css.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { CSSOptions } from 'vite';

import { generateGlobalVars } from '../generate/generateGlobalVars';
import { generateModifyVars } from '../generate/generateModifyVars';
import autoprefixer from 'autoprefixer';
export function createViteCss(
  _env: ImportMetaEnv,
  _isBuild: boolean
): { css: CSSOptions } | undefined {
  return {
    //生成自定义用户配置
    css: {
      // postcss配置
      postcss: {
        plugins: [
          // 前缀追加
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%'
            ],
            grid: true
          })
        ]
      },
      // 全局变量定义及覆盖
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          globalVars: generateGlobalVars(),
          modifyVars: generateModifyVars()
        }
      }
    }
  };
}
