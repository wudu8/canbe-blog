export enum ArticleMode {
  md = 'md',
  rich = 'rich'
}

/** 文章数据 */
export interface ArticleData {
  id: string;
  title: string;
  content: string;
  mode: ArticleMode;
}
