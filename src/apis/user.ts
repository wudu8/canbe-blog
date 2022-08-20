import service from '@/utils/service';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return service.post<LoginRes>('/api/user/login', { data: data });
}

export function logout() {
  return service.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return service.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return service.post<RouteRecordNormalized[]>('/api/user/menu');
}
