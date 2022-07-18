/**
 * 树结构数组工具函数
 */

import { isArray, merge } from 'lodash-es';

const defaultOpions = {
  children: 'children',
  key: 'key',
  preOrder: true
};

function traversalTree(handleFn: Fn, otherFn: Fn, preOrder: boolean) {
  if (preOrder) {
    handleFn();
    otherFn();
  } else {
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
  preOrder?: boolean;
}

export function flattenTree<T extends SafeAny, K extends BaseTree>(
  tree: K[],
  handleFn: (item: K, index: number, arr: K[]) => T,
  options?: TreeOptions
) {
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
