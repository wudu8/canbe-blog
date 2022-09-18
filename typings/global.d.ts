export {};

declare global {
  function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
  function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
  function clearInterval(handle?: number): void;
  function clearTimeout(handle?: number): void;

  const __DEV__: boolean;

  type SafeAny = any;

  type Fn<T = SafeAny> = (...arg: T[]) => void;

  interface Window {
    systemOptions: {
      title: string;
    };
  }

  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_MOCK_ENABLED: boolean;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_SERVER_URL: string;
    readonly __DEV__: boolean;

    readonly VITE_APP_FRONT_TITLE: string;
    readonly VITE_APP_ADMIN_TITLE: string;
    readonly VITE_APP_LOGO: string;
    readonly VITE_APP_YEAR: string;
    readonly VITE_APP_PREFIX: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  type Indexable<T = any> = {
    [key: string]: T;
  };

  type CKey = number | string | symbol;

  type Lazy<T> = () => Promise<T>;
  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;
  type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  type ResponseData<T = SafeAny> = {
    code: number;
    result: T;
    message: string;
    success: boolean;
  };

  enum DelFlagStatus {
    /** 正常 */
    normal = '0',
    /** 已删除 */
    deleted = '1'
  }

  interface CommonField {
    /** 创建人 */
    createBy: string;
    /** 创建时间 */
    createTime: string;
    /** 删除标记 */
    delFlag: DelFlagStatus;
    /** 更新人 */
    updateBy: string;
    /** 更新时间 */
    updateTime: string;
  }
}
