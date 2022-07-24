import type { LocaleMessageDictionary, VueMessageType } from 'vue-i18n';
import { merge } from 'lodash-es';

export interface I18nMessagesContext {
  enMessages: LocaleMessageDictionary<VueMessageType>;
  zhMessages: LocaleMessageDictionary<VueMessageType>;
}

export default function getI18nMessage(): I18nMessagesContext {
  let enMessages: LocaleMessageDictionary<VueMessageType> = {};
  let zhMessages: LocaleMessageDictionary<VueMessageType> = {};
  const enModules = import.meta.globEager('./en-US/*.ts');
  const zhModules = import.meta.globEager('./zh-CN/*.ts');

  Object.keys(enModules).forEach(key => {
    const mod: LocaleMessageDictionary = enModules[key].default || {};
    enMessages = merge(enMessages, mod);
  });
  Object.keys(zhModules).forEach(key => {
    const mod = zhModules[key].default || {};
    zhMessages = merge(zhMessages, mod);
  });
  return {
    enMessages,
    zhMessages
  };
}
