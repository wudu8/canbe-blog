import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@/utils/props';
import type { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list/interface';
import type { PropType } from 'vue';

export interface TitleTag {
  color: string;
  label: string;
}

export interface ArticleDataSource {
  /** 文章唯一key */
  id: string;
  /** 文章标题 */
  blogTitle: string;
  /** 文章摘要 */
  description: string;
  thumb: string;
  /** 文章标签 */
  blogTags: string[];
  /** 发布时间 */
  publishTime: string;
  /** 作者 */
  blogAuthor: string;
  /** 阅读数 */
  readingNum: number;
  /** 点赞数 */
  favourNum: number;
  /** 评论数 */
  commentNum: number;
  /** 收藏数 */
  storeNum: number;
  /** 最后一次更新时间 */
  updateTime: string;

  beforeTag?: TitleTag;
  afterTag?: TitleTag;

  [key: CKey]: SafeAny;
}

export interface ArticleItemConfig {
  /** 隐藏摘要图片 */
  hiddenExtra?: boolean;
  /** 隐藏顶部作者信息 */
  hiddenInfo?: boolean;
  /** 隐藏收藏数信息 */
  hiddenStoreNum?: boolean;
  /** 隐藏操作信息 */
  hiddenActions?: boolean;
  /** 隐藏文章统计信息 */
  hiddenStatistics?: boolean;
  /** 隐藏底部最新更新时间 */
  hiddenActionTime?: boolean;
  /** 禁用点赞 */
  disabledFavour?: boolean;
  /** 自定义title链接 */
  getHref?: (record: ArticleDataSource) => string | undefined;
}

export const defaultArticleItemConfig = {
  hiddenExtra: false,
  hiddenInfo: false,
  hiddenStoreNum: true,
  hiddenActions: true,
  hiddenStatistics: false,
  hiddenActionTime: true,
  disabledFavour: false,
  getHref: undefined
};

export const articleListProps = {
  virtualListProps: Object as PropType<VirtualListProps>,
  dataSource: {
    type: Array as PropType<ArticleDataSource[]>,
    require: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  itemConfig: {
    type: Object as PropType<ArticleItemConfig>,
    default: undefined
  }
};

// 给组件代码使用的props类型
export type ArticleListInnerProps = ExtractInnerPropTypes<typeof articleListProps>;
// 给业务代码使用的props类型
export type ArticleListPublicProps = ExtractPublicPropTypes<typeof articleListProps>;
