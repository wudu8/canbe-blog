import type { RouteRecordNormalized } from 'vue-router';

import { defineStore } from 'pinia';
import { AppState } from './types';
import { DeviceType } from '@/hooks';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    device: DeviceType.desktop,
    hideMenu: true,
    serverMenu: [],
    theme: 'light',
    logo: import.meta.env.VITE_APP_LOGO,
    year: import.meta.env.VITE_APP_YEAR,
    protalTitle: import.meta.env.VITE_APP_FRONT_TITLE,
    adminTitle: import.meta.env.VITE_APP_ADMIN_TITLE
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    }
  },

  actions: {
    clearServerMenu() {
      this.serverMenu = [];
    },
    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: DeviceType) {
      this.device = device;
      this.hideMenu = device === DeviceType.mobile;
    }
  }
});

export default useAppStore;
