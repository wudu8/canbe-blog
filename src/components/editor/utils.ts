import type { DeleteImg } from './types';

export function getAllImagesPathByMd(content: string): DeleteImg[] {
  const paths: DeleteImg[] = [];
  const reg = /!\[(.*)\]\((.*)\)/g;
  content.replace(reg, (substring: string, ...arg: string[]) => {
    paths.push({
      name: arg[0],
      path: arg[1]
    });
    return substring;
  });
  return paths;
}

export function getAllImagesPathByRich(content: string): DeleteImg[] {
  const paths: DeleteImg[] = [];
  const imgReg = /<img.*?(?:>|\/>)/gi;
  const imgs = content.match(imgReg);
  const pathReg = /src=['"]?([^'"]*)['"]?/i;
  const altReg = /alt=['"]?([^'"]*)['"]?/i;
  if (!imgs) {
    return paths;
  }
  imgs.forEach(img => {
    const name = img.match(altReg)?.[1];
    const path = img.match(pathReg)?.[1];
    if (path) {
      paths.push({
        name,
        path
      });
    }
  });
  return paths;
}

/**
 * 获取md内容中被删除的图片
 * @param newContent 新内容
 * @param oldContent 旧内容
 * @param md 内容类型是否为md
 */
export function compareDeletedImage(
  newContent: string,
  oldContent: string,
  md: boolean
): DeleteImg[] {
  const getAddImages = md ? getAllImagesPathByMd : getAllImagesPathByRich;
  const newContentImgs = getAddImages(newContent);
  const oldContentImgs = getAddImages(oldContent);
  const deletedImgs: DeleteImg[] = [];
  oldContentImgs.forEach(oldImg => {
    if (!newContentImgs.find(newImg => newImg.path === oldImg.path)) {
      deletedImgs.push(oldImg);
    }
  });
  return deletedImgs;
}

/**
 * 获取md内容中被删除的图片
 * @param newContent 新内容
 * @param oldContent 旧内容
 * @param md 内容类型是否为md
 */
export function getAllImage(content: string, md: boolean): DeleteImg[] {
  const getAddImages = md ? getAllImagesPathByMd : getAllImagesPathByRich;
  const contentImgs = getAddImages(content);
  return contentImgs;
}
