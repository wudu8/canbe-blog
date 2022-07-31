import { PropType } from 'vue';

export interface siderCardData {
  id: number | string;
  name: string;
  num: number;
}

export const siderCardProps = {
  dataSource: {
    type: Array as PropType<siderCardData[]>,
    require: true
  }
};

export type SiderCardProps = typeof siderCardProps;
