/**
 * 解析url中的参数
 * @param url url
 * @returns Indexable<string>
 */
export function getUrlParams(url: string): Indexable<string> {
  const obj: Indexable<string> = {};
  const reg = /([^?=&]+)=([^?=&]+)/g;
  url.replace(reg, (substring: string, ...arg: string[]) => {
    obj[arg[0]] = arg[1];
    return substring;
  });
  return obj;
}
