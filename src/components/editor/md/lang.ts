import { defaultLocale, LocaleEnum } from '@/locale';

interface Locales {
  math: Record<string, string>;
  mermaid: Record<string, string>;
  gfm: Record<string, string>;
  bytemd: Record<string, string>;
}

function stripPrefixes(obj: Record<LocaleEnum, SafeAny>) {
  return Object.entries(obj).map(([_key, value]) => {
    // p[key.split('/').slice(-1)[0].replace('.json', '')] = value;
    // console.log(p)
    return value as Record<string, string>;
  })[0];
}

export default function getLocales(): Locales {
  const locales = {} as Locales;
  if (defaultLocale == LocaleEnum.zhCN) {
    locales.math = stripPrefixes(import.meta.globEager(`@bytemd/plugin-math/locales/zh_Hans.json`));
    locales.gfm = stripPrefixes(import.meta.globEager(`@bytemd/plugin-gfm/locales/zh_Hans.json`));
    locales.mermaid = stripPrefixes(
      import.meta.globEager(`@bytemd/plugin-mermaid/locales/zh_Hans.json`)
    );
    locales.bytemd = stripPrefixes(import.meta.globEager(`bytemd/locales/zh_Hans.json`));
  } else if (defaultLocale == LocaleEnum.enUS) {
    locales.math = stripPrefixes(import.meta.globEager(`@bytemd/plugin-math/locales/en.json`));
    locales.gfm = stripPrefixes(import.meta.globEager(`@bytemd/plugin-gfm/locales/en.json`));
    locales.mermaid = stripPrefixes(
      import.meta.globEager(`@bytemd/plugin-mermaid/locales/en.json`)
    );
    locales.bytemd = stripPrefixes(import.meta.globEager(`bytemd/locales/en.json`));
  }
  return locales;
}
