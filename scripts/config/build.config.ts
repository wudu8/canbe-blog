import type { BuildOptions } from 'vite';

import * as path from 'path';

/* global ImportMetaEnv */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function createViteBuild(env: ImportMetaEnv): { build: BuildOptions } {
  return {
    build: {
      assetsDir: 'static',
      // 清除console和debugger
      terserOptions: {
        compress: {
          // eslint-disable-next-line camelcase
          drop_console: true,
          // eslint-disable-next-line camelcase
          drop_debugger: true
        }
      },
      rollupOptions: {
        input: {
          index: path.resolve(process.cwd(), 'index.html')
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
