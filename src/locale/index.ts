import type { App } from 'vue';

import { createI18n } from 'vue-i18n';
import getI18nMessage from './getI18n';

export enum LocaleEnum {
  zhCN = 'zh-CN',
  enUS = 'en-US'
}

export const LOCALE_OPTIONS = [
  { label: '中文', value: LocaleEnum.zhCN },
  { label: 'English', value: LocaleEnum.enUS }
];
export const defaultLocale: LocaleEnum =
  (localStorage.getItem('arco-locale') as LocaleEnum) ?? LocaleEnum.zhCN;

const i18nMessage = getI18nMessage();

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: LocaleEnum.zhCN,
  globalInjection: true,
  messages: {
    [LocaleEnum.zhCN]: i18nMessage.enMessages,
    [LocaleEnum.enUS]: i18nMessage.zhMessages
  }
});

//导出语言切换使得在其他js文件中也能使用多语言
export function t(val: string): string {
  try {
    const { t } = i18n.global;
    return t(val);
  } catch (error) {
    console.log(error);
    return val;
  }
}

export default function setupLocale(app: App): void {
  app.use(i18n);
}
