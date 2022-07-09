import type { Plugin } from 'vite';

import * as path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import windiCSS from 'vite-plugin-windicss';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver as antDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import compressPlugin from 'vite-plugin-compression';

/* global ImportMetaEnv */
export function createVitePlugins(env: ImportMetaEnv): { plugins: (Plugin | Plugin[])[] } {
  const { VITE_MOCK_ENABLED } = env,
    definePlugins = {
      plugins: [
        vue(),
        // vue jsx语法支持
        vueJsx(),
        // windicss
        windiCSS(),
        // eslint运行时校验
        eslintPlugin({
          // 配置
          cache: false // 禁用 eslint 缓存
        }),
        // stylelint运行时校验
        stylelintPlugin({
          cache: false // 禁用 stylelint 缓存
        }),
        // gzip压缩
        compressPlugin({
          //gzip静态资源压缩
          verbose: true, // 默认即可
          disable: false, //开启压缩(不禁用)，默认即可
          deleteOriginFile: false, //删除源文件
          threshold: 10240, //压缩前最小文件大小
          algorithm: 'gzip', //压缩算法
          ext: '.gz' //文件类型
        }),
        // 按需自动导入组件
        components({
          resolvers: [
            /**
             * 自动按需引入antd组件
             * 此插件无法处理antd非组件模块，如 message，这种组件需要手动加载
             */
            antDesignVueResolver()
          ],
          directoryAsNamespace: true
        }),
        // svg图片引入支持
        createSvgIconsPlugin({
          // 指定要缓存的文件夹
          iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
          // 指定symbolId格式
          symbolId: 'icon-[name]'
        })
      ]
    };

  if (VITE_MOCK_ENABLED) {
    // mock
    definePlugins.plugins.push(
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: true
      })
    );
  }

  return definePlugins;
}
