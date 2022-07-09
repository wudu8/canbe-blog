import type { ServerOptions } from 'vite';

/* global ImportMetaEnv */
export function createViteServer(env: ImportMetaEnv): { server: ServerOptions } {
  const { VITE_APP_BASE_API, VITE_APP_SERVER_URL } = env;

  return {
    server: {
      hmr: true,
      open: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_SERVER_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + VITE_APP_BASE_API), '')
        }
      }
    }
  };
}
