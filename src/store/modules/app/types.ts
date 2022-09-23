import type { RouteRecordNormalized } from 'vue-router';
import type { DeviceType } from '@/hooks';

export interface AppState {
  device: DeviceType;
  serverMenu: RouteRecordNormalized[];
  logo: string;
  logoTitle: string;
  year: string;
  portalTitle: string;
  adminTitle: string;
  settings: AppSettings;
}

export interface AppSettings {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menuFromServer: boolean;
  menu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  tabBar: boolean;
  [key: string]: unknown;
}
