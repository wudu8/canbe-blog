/*
 * @Description: 初始化pinia
 * @Autor: wudu8
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

export function setupStore(app: App<Element>) {
  const pinia = createPinia();

  pinia.use(piniaPersist);
  app.use(pinia);
}
