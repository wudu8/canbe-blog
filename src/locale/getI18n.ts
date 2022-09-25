import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';
import { merge } from 'lodash-es';

export interface I18nMessagesContext {
  enMessages: LocaleMessageDictionary<VueMessageType>;
  zhMessages: LocaleMessageDictionary<VueMessageType>;
}

export default function getI18nMessage(): I18nMessagesContext {
  let enMessages: LocaleMessageDictionary<VueMessageType> = {};
  let zhMessages: LocaleMessageDictionary<VueMessageType> = {};
  const enModules = import.meta.glob('./en-US/*.ts', { import: 'default', eager: true });
  const zhModules = import.meta.glob('./zh-CN/*.ts', { import: 'default', eager: true });

  Object.keys(enModules).forEach(key => {
    const mod = (enModules[key] || {}) as LocaleMessageDictionary;
    enMessages = merge(enMessages, mod);
  });
  Object.keys(zhModules).forEach(key => {
    const mod = zhModules[key] || {};
    zhMessages = merge(zhMessages, mod);
  });
  return {
    enMessages,
    zhMessages
  };
}
