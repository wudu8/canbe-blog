import { LocaleEnum } from '@/locale';

interface Locales {
  math: Record<string, string>;
  mermaid: Record<string, string>;
  gfm: Record<string, string>;
  bytemd: Record<string, string>;
}

function stripPrefixes(obj: Record<LocaleEnum, SafeAny>) {
  return Object.entries(obj).map(([_key, value]) => {
    return value as Record<string, string>;
  })[0];
}

export default function getLocales(currentLocale: LocaleEnum): Locales {
  const locales = {} as Locales;
  if (currentLocale == LocaleEnum.zhCN) {
    locales.math = stripPrefixes(
      import.meta.glob('@bytemd/plugin-math/locales/zh_Hans.json', {
        import: 'default',
        eager: true
      })
    );
    locales.gfm = stripPrefixes(
      import.meta.glob('@bytemd/plugin-gfm/locales/zh_Hans.json', {
        import: 'default',
        eager: true
      })
    );
    locales.mermaid = stripPrefixes(
      import.meta.glob('@bytemd/plugin-mermaid/locales/zh_Hans.json', {
        import: 'default',
        eager: true
      })
    );
    locales.bytemd = stripPrefixes(
      import.meta.glob('bytemd/locales/zh_Hans.json', { import: 'default', eager: true })
    );
  } else if (currentLocale == LocaleEnum.enUS) {
    locales.math = stripPrefixes(
      import.meta.glob('@bytemd/plugin-math/locales/en.json', { import: 'default', eager: true })
    );
    locales.gfm = stripPrefixes(
      import.meta.glob('@bytemd/plugin-gfm/locales/en.json', { import: 'default', eager: true })
    );
    locales.mermaid = stripPrefixes(
      import.meta.glob('@bytemd/plugin-mermaid/locales/en.json', { import: 'default', eager: true })
    );
    locales.bytemd = stripPrefixes(
      import.meta.glob('bytemd/locales/en.json', { import: 'default', eager: true })
    );
  }
  return locales;
}
