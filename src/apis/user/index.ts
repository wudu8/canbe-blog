import type { RouteRecordNormalized } from 'vue-router';
import type { LoginData, LoginRes } from './types';

import service from '@/utils/service';
import { UserState } from '@/store/modules/user/types';

export function login(data: LoginData) {
  return service.post<LoginRes>('/user/login', { data: data });
}

export function logout() {
  return service.post<LoginRes>('/user/logout');
}

export function getUserInfo() {
  return service.post<UserState>('/user/info');
}

export function getMenuList() {
  return service.post<RouteRecordNormalized[]>('/user/menu');
}
