/*
 * @Description: 初始化pinia
 * @Autor: wudu8
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import useAppStore from './modules/app';
import useUserStore from './modules/user';

export { useAppStore, useUserStore };

export function setupStore(app: App<Element>): void {
  const pinia = createPinia();

  pinia.use(piniaPersist);
  app.use(pinia);
}
