import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@/utils/props';

import { PropType } from 'vue';

export interface siderCardData {
  id: number | string;
  name: string;
  num: number;
}

export const siderCardProps = {
  dataSource: {
    type: Array as PropType<siderCardData[]>,
    require: true,
    default: () => []
  }
};

// 给组件代码使用的props类型
export type SiderCardInnerProps = ExtractInnerPropTypes<typeof siderCardProps>;
// 给业务代码使用的props类型
export type SiderCardPublicProps = ExtractPublicPropTypes<typeof siderCardProps>;
