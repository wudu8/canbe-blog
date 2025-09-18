/*
 * @Author: wudu8 y2386166796@163.com
 * @Date: 2023-11-25 19:39:37
 * @LastEditors: wudu8 y2386166796@163.com
 * @LastEditTime: 2025-09-18 23:52:56
 * @FilePath: \canbe-blog\src\components\editor\md\lang.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      import.meta.glob('@bytemd/locales/zh_Hans.json', { import: 'default', eager: true })
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
