import App from './App.vue';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import setupLocale from '@/locale';
import registerPlugins from './plugins';
import '@/theme/index.less';
import 'virtual:svg-icons-register'; // 注入svg
import 'virtual:windi.css'; // 注入windicss

const app = createApp(App);
// store
setupStore(app);
// vue-i18n
setupLocale(app);
// ui & global components & directives & other plugins
registerPlugins(app);

// router
setupRouter(app);

router.isReady().then(() => {
  app.mount('#app');
});
