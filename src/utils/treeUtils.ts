/**
 * 树结构数组工具函数
 */

import { cloneDeep, isArray, merge } from 'lodash-es';

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

export interface OrderTreeOptions extends TreeOptions {
  /** 是否为先序遍历 */
  preOrder?: boolean;
}

/**
 * 遍历tree数组并返回处理后新树形结构
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 扁平化的数组
 */
export function mapTree<T extends BaseTree, Result extends BaseTree>(
  tree: T[],
  handleFn: (item: T, index: number, arr: T[]) => Result,
  options?: OrderTreeOptions
) {
  const mergeOptions = merge(defaultOpions, options);
  const traversal = (
    tree: T[],
    handleFn: (item: T, index: number, arr: T[]) => Result,
    options: Required<OrderTreeOptions>
  ) => {
    return tree.map((item, index, arr) => {
      if (isArray(item[options.children])) {
        (item as Indexable)[options.children] = traversal(
          item[options.children],
          handleFn,
          options
        );
      }
      return handleFn(item, index, arr);
    });
  };
  return traversal(cloneDeep(tree), handleFn, mergeOptions);
}

/**
 * 遍历tree数组
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 扁平化的数组
 */
export function forEachTree<T extends BaseTree>(
  tree: T[],
  handleFn: (item: T, index: number, arr: T[]) => void,
  options?: OrderTreeOptions
) {
  const mergeOptions = merge(defaultOpions, options);
  const traversal = (
    tree: T[],
    handleFn: (item: T, index: number, arr: T[]) => void,
    options: Required<OrderTreeOptions>
  ) => {
    tree.forEach((item, index, arr) => {
      traversalTree(
        () => handleFn(item, index, arr),
        () => {
          if (isArray(item[options.children])) {
            traversal(item[options.children], handleFn, options);
          }
        },
        options.preOrder
      );
    });
  };
  traversal(tree, handleFn, mergeOptions);
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
  options?: OrderTreeOptions
): T[] {
  const flattenArr: T[] = [];
  forEachTree(
    cloneDeep(tree),
    (item, index, arr) => {
      flattenArr.push(handleFn(item, index, arr));
    },
    options
  );
  return flattenArr;
}

/**
 * 过滤树形结构数据，并扁平化处理，返回一维数组
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 过滤后的数组
 */
export function filterAndFlattenTrees<T extends BaseTree>(
  tree: T[],
  handleFn: (item: T, index: number, arr: T[]) => boolean,
  options?: OrderTreeOptions
): T[] {
  const filtered: T[] = [];
  forEachTree(
    cloneDeep(tree),
    (item, index, arr) => {
      !!handleFn(item, index, arr) && filtered.push(item);
    },
    options
  );
  return filtered;
}

/**
 * 根据key删除tree元素，会删除所有相同key对应的元素
 * @param tree 要遍历的树形结构
 * @param handleFn 节点处理函数
 * @param options 配置对象
 * @returns 过滤后的数组
 */
export function removeTreesByKey<T extends BaseTree>(
  tree: T[],
  key: SafeAny,
  options?: TreeOptions
) {
  const mergeOptions = merge(defaultOpions, options);
  const traversal = (dataTree: T[], key: SafeAny, options: Required<TreeOptions>) => {
    dataTree.forEach((item, index) => {
      if (item[options.key] === key) {
        dataTree.splice(index, 1);
      } else if (isArray(item[options.children])) {
        traversal(item[options.children], key, options);
      }
    });
  };
  traversal(tree, key, mergeOptions);
}
