import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@/utils/props';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import type { PropType } from 'vue';

export const bMenuProps = {
  menus: {
    type: Array as PropType<(RouteRecordNormalized | RouteRecordRaw)[]>,
    default: () => []
  },
  useCollapsed: {
    type: Boolean,
    default: true
  },
  defaultOpenKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  }
};

// 给组件代码使用的props类型
export type BMenuInnerProps = ExtractInnerPropTypes<typeof bMenuProps>;
// 给业务代码使用的props类型
export type BMenuPublicProps = ExtractPublicPropTypes<typeof bMenuProps>;
