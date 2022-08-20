import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResultEnum } from './httpEnum';
import { Notification } from '@arco-design/web-vue';

//自定义拦截器类型
interface customInterceptorType {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: SafeAny) => SafeAny;
  resInterceptor?: (res: SafeAny) => SafeAny;
  resInterceptorCatch?: (error: SafeAny) => SafeAny;
}

//定义自己的实例类型
interface customRequest extends AxiosRequestConfig {
  interceptor?: customInterceptorType;
}

function throwError(data: SafeAny, msg?: string) {
  Notification.error({
    title: '异常提示',
    content: msg ?? '请求错误，请稍后尝试'
  });
  return data;
}

class HttpService {
  protected instance: AxiosInstance;
  interceptor?: customInterceptorType;

  constructor(config: customRequest) {
    this.instance = axios.create(config);
    this.interceptor = config?.interceptor;

    this.instance.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8';

    //从config里面取出每个实例的不同拦截器 （可以删除，如果没有单独实例处理）
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptor?.resInterceptor,
      this.interceptor?.resInterceptorCatch
    );

    //统一，所以实例都会拦截
    this.instance.interceptors.request.use(
      config => {
        //token拦截
        const token = localStorage.getItem('token');
        if (token) {
          if (!config.headers) {
            config.headers = {};
          }
          config.headers.Authorization = token;
        }
        return config;
      },
      error => {
        return throwError(error);
      }
    );
    this.instance.interceptors.response.use(
      res => {
        if (res.data.code !== ResultEnum.SUCCESS) {
          return throwError(res.data, res.data.message);
        }
        return res.data;
      },
      error => {
        return throwError(error);
      }
    );
  }

  //对部分接口的进行拦截配置
  request<T, D = SafeAny>(url: string, params?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    const config: AxiosRequestConfig<D> = { ...params, url };

    return new Promise(resolve => {
      this.instance.request<T, ResponseData<T>>(config).then(res => {
        resolve(res);
      });
    });
  }

  get<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  post<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'POST' });
  }

  delete<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  options<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'OPTIONS' });
  }

  put<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'POST' });
  }

  patch<T, D = SafeAny>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...config, method: 'PATCH' });
  }
}

export default new HttpService({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 12000
});
