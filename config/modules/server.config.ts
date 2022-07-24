import type { ServerOptions } from 'vite';

export function createViteServer(
  env: ImportMetaEnv,
  isBuild: boolean
): { server: ServerOptions } | undefined {
  const { VITE_APP_BASE_API, VITE_APP_SERVER_URL } = env;

  if (isBuild) {
    return undefined;
  }

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
