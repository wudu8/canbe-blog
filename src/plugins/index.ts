/*
 * @Description: plugins
 * @Autor: wudu8
 */

import type { App } from 'vue';
import { registerIcon } from './useIcon';

/**
 * 注册全局组件
 * @param app 实例对象
 */
function registerComponents(app: App<Element>) {
  registerIcon(app);
}

function registerPlugins(app: App<Element>) {
  // 注册全局组件
  registerComponents(app);
}

export default registerPlugins;
