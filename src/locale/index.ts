import type { App } from 'vue';

import { createI18n } from 'vue-i18n';
import getI18nMessage from './getI18n';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
];
const defaultLocale = localStorage.getItem('arco-locale') || 'zh-CN';

const i18nMessage = getI18nMessage();

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  allowComposition: true,
  globalInjection: true,
  messages: {
    'en-US': i18nMessage.enMessages,
    'zh-CN': i18nMessage.zhMessages
  }
});

export default function setupLocale(app: App): void {
  app.use(i18n);
}
