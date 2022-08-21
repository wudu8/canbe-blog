/*
 * @Description: plugins
 * @Autor: wudu8
 */

import type { App } from 'vue';
import { registerIcon } from './useIcon';
import Tooltip from '@/components/tooltip/Index.vue';

/**
 * 注册全局组件
 * @param app 实例对象
 */
function registerComponents(app: App<Element>) {
  registerIcon(app);
  app.component(Tooltip.name, Tooltip);
}

function registerPlugins(app: App<Element>) {
  // 注册全局组件
  registerComponents(app);
}

export default registerPlugins;
