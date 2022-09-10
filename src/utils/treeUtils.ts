/**
 * 树结构数组工具函数
 */

import { isArray, merge } from 'lodash-es';

const defaultOpions = {
  children: 'children',
  key: 'key',
  preOrder: true
};

/**
 * 先序遍历执行逻辑处理
 * @param handleFn 当前节点处理函数
 * @param otherFn 其他节点处理函数
 * @param preOrder 是否为先序遍历
 */
function traversalTree(handleFn: Fn, otherFn: Fn, preOrder: boolean) {
  if (preOrder) {
    // 先处理当前节点，再处理其他节点
    handleFn();
    otherFn();
  } else {
    // 先处理其他节点，再处理当前节点
    otherFn();
    handleFn();
  }
}

type TreeKey = string | number | symbol;

interface BaseTree {
  [k: TreeKey]: SafeAny | SafeAny[];
}

export interface TreeOptions {
  children?: string;
  key?: string;
  /** 是否为先序遍历 */
  preOrder?: boolean;
}

/**
 * 扁平化树形结构数据，返回一维数组
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 扁平化的数组
 */
export function flattenTree<T extends SafeAny, K extends BaseTree>(
  tree: K[],
  handleFn: (item: K, index: number, arr: K[]) => T,
  options?: TreeOptions
): T[] {
  const mergeOptions = merge(defaultOpions, options);
  const flattenArr: T[] = [];
  const flatten = (
    tree: K[],
    handleFn: (item: K, index: number, arr: K[]) => T,
    options: TreeOptions
  ) => {
    tree.forEach((item, index, arr) => {
      traversalTree(
        () => flattenArr.push(handleFn(item, index, arr)),
        () => {
          if (isArray(item[mergeOptions.children])) {
            flatten(item[mergeOptions.children], handleFn, options);
          }
        },
        mergeOptions.preOrder
      );
    });
  };
  flatten(tree, handleFn, mergeOptions);
  return flattenArr;
}

/**
 * 过滤树形结构数据，返回一维数组
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 过滤后的数组
 */
export function filterTrees<T extends BaseTree>(
  tree: T[],
  handleFn: (item: T, index: number, arr: T[]) => boolean,
  options?: TreeOptions
): T[] {
  const mergeOptions = merge(defaultOpions, options);
  const filtered: T[] = [];
  const traversal = (
    tree: T[],
    handleFn: (item: T, index: number, arr: T[]) => boolean,
    options: TreeOptions
  ) => {
    tree.forEach((item, index, arr) => {
      traversalTree(
        () => !!handleFn(item, index, arr) && filtered.push(item),
        () => {
          if (isArray(item[mergeOptions.children])) {
            traversal(item[mergeOptions.children], handleFn, options);
          }
        },
        mergeOptions.preOrder
      );
    });
  };
  traversal(tree, handleFn, mergeOptions);
  return filtered;
}
