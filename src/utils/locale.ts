import type { LocaleEnum } from '@/locale';

const TOKEN_KEY = 'current-locale';

const getLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY) as LocaleEnum;
};

const setLocalStorage = (token: LocaleEnum) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getLocalStorage, setLocalStorage, clearLocalStorage };
