import type { ComputedRef } from 'vue';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';

export interface LocaleContext {
  currentLocale: ComputedRef<string>;
  changeLocale: (value: string) => void;
}

export function useLocale(): LocaleContext {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = (value: string) => {
    i18.locale.value = value;
    localStorage.setItem('arco-locale', value);
    Message.success(i18.t('navbar.action.locale'));
  };
  return {
    currentLocale,
    changeLocale
  };
}
