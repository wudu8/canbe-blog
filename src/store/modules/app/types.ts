import type { RouteRecordNormalized } from 'vue-router';
import type { DeviceType } from '@/hooks';

export interface AppState {
  device: DeviceType;
  serverMenu: RouteRecordNormalized[];
  logo: string;
  year: string;
  theme: string;
  protalTitle: string;
  adminTitle: string;
  [key: string]: unknown;
}
