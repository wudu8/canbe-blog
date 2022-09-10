import type { RouteRecordNormalized } from 'vue-router';

import { defineStore } from 'pinia';
import { AppState, AppSettings } from './types';
import { DeviceType } from '@/hooks';
import defaultSettings from '@/config/settings.json';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    device: DeviceType.desktop,
    serverMenu: [],
    logo: import.meta.env.VITE_APP_LOGO,
    year: import.meta.env.VITE_APP_YEAR,
    protalTitle: import.meta.env.VITE_APP_FRONT_TITLE,
    adminTitle: import.meta.env.VITE_APP_ADMIN_TITLE,
    settings: { ...defaultSettings }
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    isMobile(state: AppState) {
      return state.device === DeviceType.mobile;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    }
  },

  actions: {
    clearServerMenu() {
      this.serverMenu = [];
    },
    // Update app settings
    updateSettings(partial: Partial<AppSettings>) {
      this.$patch({ settings: { ...this.settings, partial } });
    },
    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.settings.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.settings.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: DeviceType) {
      this.device = device;
    }
  }
});

export default useAppStore;
