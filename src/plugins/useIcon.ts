/*
 * @Description: plugins
 * @Autor: wudu8
 */

import type { App } from 'vue';
import svgIcon from '@/components/svg-icon/index.vue';

export function registerIcon(app: App<Element>) {
  // 注册Icon全局组件
  app.component('svg-icon', svgIcon);
}
