import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';

import {
  createViteCss,
  createVitePlugins,
  convertViteEnv,
  createViteServer,
  createViteBuild,
  createViteOptimizeDeps
} from './config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const envDir = './envs';
  const envConfig = convertViteEnv(loadEnv(mode, envDir));
  const { VITE_PUBLIC_PATH } = envConfig;

  const options = {
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
    // 依赖优化选项
    ...createViteOptimizeDeps(envConfig),
    // 样式配置
    ...createViteCss(envConfig, isBuild),
    // 注册vite插件
    ...createVitePlugins(envConfig, isBuild),
    // 配置server
    ...createViteServer(envConfig, isBuild),
    // 打包配置
    ...createViteBuild(envConfig, isBuild)
  };
  return options;
});
