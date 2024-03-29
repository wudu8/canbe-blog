import type { LoginData } from '@/apis/user/types';

import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserInfo } from '@/apis/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { LoginState, UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): LoginState => ({
    token: undefined,
    userInfo: {
      id: undefined,
      realname: undefined,
      avatar: undefined,
      email: undefined,
      phone: undefined,
      /** 性别 */
      sex: undefined,
      /** 第三方登录的唯一标识 */
      thirdId: undefined,
      /** 第三方类型 */
      thirdType: undefined,
      role: ''
    }
  }),

  getters: {
    user(state: LoginState): UserState {
      return { ...state.userInfo };
    },
    isLogin(state: LoginState): boolean {
      return !!state.token;
    }
  },

  actions: {
    switchRoles() {
      return new Promise(resolve => {
        this.userInfo.role = this.userInfo.role === 'user' ? 'admin' : 'user';
        resolve(this.userInfo.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<LoginState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.result);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        this.setInfo(res.result);
        setToken(res.result.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    }
  }
});

export default useUserStore;
