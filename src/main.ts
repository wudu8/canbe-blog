import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import registerPlugins from './plugins';
import '@/theme/index.less';
import 'virtual:svg-icons-register'; // 注入svg
import 'virtual:windi.css'; // 注入windicss

const app = createApp(App);
// router

setupRouter(app);
// store
setupStore(app);
// ui & global components & directives & other plugins
registerPlugins(app);

router.isReady().then(() => {
  app.mount('#app');
});
