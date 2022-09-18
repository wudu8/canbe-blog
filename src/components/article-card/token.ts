import type { ArticleDataSource } from './types';

export interface ArticleListContext {
  updateItem: (record: ArticleDataSource) => void;
  hiddenExtra: boolean;
  hiddenInfo: boolean;
  hiddenStoreNum: boolean;
  disabledFavour: boolean;
}

export const ArticleListToken = Symbol('article-list');
