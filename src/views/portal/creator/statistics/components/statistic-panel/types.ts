/*
 * @Author: zkr
 * @Date: 2022-09-20 14:48:35
 * @LastEditors: zkr
 * @LastEditTime: 2022-09-26 15:03:53
 * @FilePath: \canbe-blog\src\views\portal\creator\statistics\components\statistic-panel\types.ts
 */
import { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '@/utils/props';

export interface StatisticData {
  /* 总数 */
  total: number;
  /* 其他数据 */
  [key: string]: SafeAny;
}

export const statisticPanelProps = {
  /* 标题 */
  title: {
    type: String,
    default: ''
  },
  /* 是否有底部描述 */
  isFooter: {
    type: Boolean,
    default: false
  },
  /* 数据 */
  dataSource: {
    type: Object as PropType<StatisticData>,
    require: true,
    default: () => {}
  }
};

// 给业务代码使用的props类型
export type StatisticPanelPublicProps = ExtractPublicPropTypes<typeof statisticPanelProps>;
