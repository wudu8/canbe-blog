import axios from 'axios';

// 创建axios
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
});

//post请求头
service.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8';

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
