import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@/utils/props';

import { PropType } from 'vue';

export interface SiderCardData {
  /** 文章类型唯一key */
  id: string;
  name: string;
  num: number;
}

export const siderCardProps = {
  title: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  dataSource: {
    type: Array as PropType<SiderCardData[]>,
    require: true,
    default: () => []
  }
};

// 给组件代码使用的props类型
export type SiderCardInnerProps = ExtractInnerPropTypes<typeof siderCardProps>;
// 给业务代码使用的props类型
export type SiderCardPublicProps = ExtractPublicPropTypes<typeof siderCardProps>;
