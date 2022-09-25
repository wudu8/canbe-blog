import type { ComputedRef } from 'vue';
import type { LocaleEnum } from '@/locale';

import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';
import { setLocalStorage } from '@/utils/locale';
import { getUrlParams } from '@/utils/url';

export interface LocaleContext {
  currentLocale: ComputedRef<LocaleEnum>;
  changeLocale: (value: LocaleEnum, saved?: boolean) => void;
}

export function useLocale(): LocaleContext {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value as LocaleEnum;
  });
  const changeLocale = (value: LocaleEnum, saved = true) => {
    i18.locale.value = value;
    if (saved) {
      setLocalStorage(value);
      Message.success(i18.t('navbar.action.locale'));
    }
  };
  return {
    currentLocale,
    changeLocale
  };
}

export function changeLocaleByUrl() {
  const { changeLocale } = useLocale();
  if (import.meta.env.__DEV__) {
    const params = getUrlParams(window.location.href);
    const lang = params.lang as LocaleEnum;
    if (lang) {
      changeLocale(lang, false);
    }
  }
}
