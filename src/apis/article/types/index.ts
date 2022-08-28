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

/** 删除文章被删除的图片列表 */
export interface DeleteArticleImages {
  id: string;
  imgs: string[];
}
