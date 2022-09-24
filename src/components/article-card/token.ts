import type { ArticleDataSource, ArticleItemConfig } from './types';

export interface ArticleListContext {
  updateItem: (record: ArticleDataSource) => void;
  itemConfig?: ArticleItemConfig;
}

export const ArticleListToken = Symbol('article-list');
