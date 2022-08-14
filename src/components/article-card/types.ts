import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@/utils/props';
import type { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list/interface';
import type { PropType } from 'vue';

export interface TitleTag {
  color: string;
  label: string;
}

export interface ArticleListData {
  id: CKey;
  title: string;
  articlePath: string;
  description: string;
  thumb: string;
  tags: string[];
  dateTime: string;
  author: string;

  viewNum: number;
  likeNum: number;
  commentNum: number;

  beforeTag?: TitleTag;
  afterTag?: TitleTag;
}

export const articleListProps = {
  virtualListProps: Object as PropType<VirtualListProps>,
  dataSource: {
    type: Array as PropType<ArticleListData[]>,
    require: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
};

// 给组件代码使用的props类型
export type ArticleListInnerProps = ExtractInnerPropTypes<typeof articleListProps>;
// 给业务代码使用的props类型
export type ArticleListPublicProps = ExtractPublicPropTypes<typeof articleListProps>;
