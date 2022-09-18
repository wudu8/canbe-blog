import type { ArticleDataSource } from '@/components/article-card';
import type { SiderCardData } from '@/components/article-type';

export enum ArticleMode {
  md = '2',
  rich = '1'
}

export enum ArticleStatus {
  /** 草稿 */
  drafts = '0',
  /** 已发布 */
  publish = '1'
}

/** 文章热门分类 */
export interface ArticleCategory extends SiderCardData, CommonField {
  /** 字典ID */
  dictId: string;
  /** 码值 */
  itemCode: string;
  /** 分类名称 */
  itemName: ArticleMode;
  /** 描述 */
  description: string;
}

/** 文章数据类型 */
export interface ArticleData extends ArticleDataSource, CommonField {
  /** 文章内容 */
  blogContent: string;
  /** 文章类型 markdown、富文本编辑器文档 */
  blogEditType: ArticleMode;
  /** 文章分类 */
  blogCategory: string;
  /** 文章状态 草稿 / 已发布 */
  blogStatus: ArticleStatus;
}

/** 删除文章被删除的图片列表 */
export interface DeleteArticleImages {
  id: string;
  imgs: string[];
}
