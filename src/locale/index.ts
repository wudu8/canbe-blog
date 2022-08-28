import type { App } from 'vue';

import { createI18n } from 'vue-i18n';
import getI18nMessage from './getI18n';
import { getLocalStorage } from '@/utils/locale';

export enum LocaleEnum {
  zhCN = 'zh',
  enUS = 'en'
}

export const LOCALE_OPTIONS = [
  { label: '中文', value: LocaleEnum.zhCN },
  { label: 'English', value: LocaleEnum.enUS }
];
const defaultLocale: LocaleEnum = getLocalStorage() ?? LocaleEnum.zhCN;

const i18nMessage = getI18nMessage();

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: LocaleEnum.zhCN,
  globalInjection: true,
  messages: {
    [LocaleEnum.zhCN]: i18nMessage.zhMessages,
    [LocaleEnum.enUS]: i18nMessage.enMessages
  }
});

//导出语言切换使得在其他js文件中也能使用多语言
export function t(val: string): string {
  if (!i18n) {
    console.error("I18N must be initialized before use 't'");
  }
  try {
    const { t } = i18n.global;
    return t(val);
  } catch (error) {
    console.error(error);
    return val;
  }
}

export default function setupLocale(app: App): void {
  app.use(i18n);
}
