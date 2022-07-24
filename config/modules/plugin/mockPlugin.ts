/**
 * mock配置
 */

import { viteMockServe } from 'vite-plugin-mock';

export default function configMockPlugin(_env: ImportMetaEnv, isBuild: boolean) {
  if (isBuild) {
    return undefined;
  }
  const mockPlugin = viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: true
  });
  return mockPlugin;
}
