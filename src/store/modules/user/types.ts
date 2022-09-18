export type RoleType = '' | '*' | 'admin' | 'user';

/** 性别类型 */
export enum SexType {
  default = '0',
  man = '1',
  woman = '2'
}

export interface UserState {
  /** 用户id */
  id?: string;
  /** 用户名称 */
  realname?: string;
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  sex?: SexType;
  /** 第三方登录的唯一标识 */
  thirdId?: string;
  /** 第三方类型 */
  thirdType?: string;
  /** 联系电话 */
  phone?: string;
  role: RoleType;
}
export interface LoginState {
  userInfo: UserState;
  token?: string;
}
