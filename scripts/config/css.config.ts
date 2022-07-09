import { defineConfig } from 'vite';

import { generateGlobalVars } from '../generate/generateGlobalVars';
import { generateModifyVars } from '../generate/generateModifyVars';

export const cssConfig = defineConfig({
  //生成自定义用户配置
  css: {
    // postcss配置
    postcss: {
      plugins: [
        // 前缀追加
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('autoprefixer')({
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
});
