import type { BuildOptions } from 'vite';

import * as path from 'path';

export function createViteBuild(env: ImportMetaEnv, isBuild: boolean): { build: BuildOptions } {
  if (!isBuild) {
    return undefined;
  }

  return {
    build: {
      assetsDir: 'static',
      rollupOptions: {
        input: {
          index: path.resolve(process.cwd(), 'index.html'),
          admin: path.resolve(__dirname, 'admin.html')
        },
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n']
          }
        }
        // output: {
        //   chunkFileNames: 'static/js/[name]-[hash].js',
        //   entryFileNames: 'static/js/[name]-[hash].js',
        //   assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        // }
      }
    }
  };
}
