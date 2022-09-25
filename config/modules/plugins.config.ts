import type { Plugin, PluginOption } from 'vite';

import * as path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import windiCSS from 'vite-plugin-windicss';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

import configArcoResolverPlugin from './plugin/arcoResolver';
import configCompressPlugin from './plugin/compress';
import configStyleImportPlugin from './plugin/styleImport';
import configHtmlPlugin from './plugin/htmlPlugin';
import configMockPlugin from './plugin/mockPlugin';

export function createVitePlugins(
  env: ImportMetaEnv,
  isBuild: boolean
): { plugins: (Plugin | PluginOption[])[] } {
  const definePlugins = {
    plugins: [
      vue(),
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: path.resolve(__dirname, './src/locales/**')
      }),
      // vue jsx语法支持
      vueJsx(),
      // windicss
      windiCSS(),
      // 按需引入组件库样式
      configStyleImportPlugin(),
      // 按需自动导入组件库
      configArcoResolverPlugin(),
      // 自动导入，无需再手动引入下面包的函数
      AutoImport({
        resolvers: [ArcoResolver()],
        // 目标文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        eslintrc: {
          enabled: false, // <-- this
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
        }
      }),
      // gzip压缩
      configCompressPlugin(env, isBuild),
      // html注入env变量
      configHtmlPlugin(env, isBuild),
      // Mock配置
      configMockPlugin(env, isBuild),

      // eslint运行时校验
      eslintPlugin({
        // 配置
        cache: false // 禁用 eslint 缓存
      }),
      // stylelint运行时校验
      stylelintPlugin({
        cache: false // 禁用 stylelint 缓存
      }),
      // svg图片引入支持
      createSvgIconsPlugin({
        // 指定要缓存的文件夹
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      })
    ].filter((plugins: (Plugin | PluginOption[]) | undefined) => plugins !== undefined)
  };

  return definePlugins;
}
