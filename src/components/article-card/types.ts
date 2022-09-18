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

  beforeTag?: TitleTag;
  afterTag?: TitleTag;
}

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
  hiddenExtra: {
    type: Boolean,
    default: false
  },
  hiddenInfo: {
    type: Boolean,
    default: false
  },
  hiddenStoreNum: {
    type: Boolean,
    default: true
  },
  disabledFavour: {
    type: Boolean,
    default: false
  }
};

// 给组件代码使用的props类型
export type ArticleListInnerProps = ExtractInnerPropTypes<typeof articleListProps>;
// 给业务代码使用的props类型
export type ArticleListPublicProps = ExtractPublicPropTypes<typeof articleListProps>;
