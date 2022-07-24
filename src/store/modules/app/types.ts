import type { RouteRecordNormalized } from 'vue-router';
import type { DeviceType } from '@/hooks/useResponsive';

export interface AppState {
  device: DeviceType;
  hideMenu: boolean;
  serverMenu: RouteRecordNormalized[];
  logo: string;
  protalTitle: string;
  adminTitle: string;
  [key: string]: unknown;
}
