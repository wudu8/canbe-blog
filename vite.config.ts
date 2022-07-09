import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';

import {
  cssConfig,
  createVitePlugins,
  convertViteEnv,
  createViteServer,
  createViteBuild
} from './scripts';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const envDir = './envs';
  const envConfig = convertViteEnv(loadEnv(mode, envDir));
  const { VITE_PUBLIC_PATH } = envConfig;

  return {
    base: VITE_PUBLIC_PATH,
    envDir: envDir,
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      __DEV__: !isBuild
    },
    // 样式配置
    ...cssConfig,
    // 注册vite插件
    ...createVitePlugins(envConfig),
    // 配置server
    ...createViteServer(envConfig),
    // 打包配置
    ...createViteBuild(envConfig)
  };
});
