/*
 * @Description: plugins
 * @Autor: wudu8
 */

import type { App } from 'vue';

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// 引入自定义svg图片
import svgIcon from '@/components/svg-icon/index.vue';

export function registerIcon(app: App<Element>) {
  app.use(ArcoVueIcon);
  // 注册Icon全局组件
  app.component('svg-icon', svgIcon);
}
