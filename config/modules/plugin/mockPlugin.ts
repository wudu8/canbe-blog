/**
 * mock配置
 */

import { viteMockServe } from 'vite-plugin-mock';

export default function configMockPlugin(env: ImportMetaEnv, isBuild: boolean) {
  if (isBuild) {
    return undefined;
  }
  const { VITE_MOCK_ENABLED } = env;

  const mockPlugin = viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: VITE_MOCK_ENABLED
  });
  return mockPlugin;
}
