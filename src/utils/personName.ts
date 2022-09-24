/**
 * 判断字符串是否为中文名
 * @param name 字符串
 * @returns boolean
 */
export function isChineseName(name: string) {
  return /^[\u4E00-\u9FA5]+$/.test(name);
}

/**
 * 判断字符串是否为英文名
 * @param name 字符串
 * @returns boolean
 */
export function isEnglishName(name: string) {
  return /^[A-Za-z\s]+$/.test(name);
}

/**
 * 获取用户的姓氏
 * @param name 姓名
 * @returns boolean
 */
export function getFirstName(name = '') {
  if (isChineseName(name)) {
    return name.trim()[0];
  }
  if (isEnglishName(name)) {
    const arr = name.trim().split(' ');
    return arr[arr.length - 1][0].toUpperCase();
  }
  return name[0];
}
