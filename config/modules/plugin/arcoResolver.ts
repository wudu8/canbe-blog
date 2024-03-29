/**
 * If you use the template method for development, you can use the unplugin-vue-components plugin to enable on-demand loading support.
 * 按需引入
 * https://github.com/antfu/unplugin-vue-components
 * https://arco.design/vue/docs/start
 */
import type { Plugin } from 'vite';

import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default function configArcoResolverPlugin(): Plugin[] {
  const arcoResolverPlugin = [
    Components({
      dirs: [], // Avoid parsing src/components.  避免解析到src/components
      deep: false,
      resolvers: [
        ArcoResolver({
          sideEffect: true,
          importStyle: 'less'
        })
      ]
    })
  ];
  return arcoResolverPlugin;
}
