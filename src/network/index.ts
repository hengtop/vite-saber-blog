/*
 * @Date: 2022-01-24 15:04:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 16:08:43
 */

import HttpRequest from './config';
import type { HttpRequestConfig } from './config/types';

export const httpRequest: HttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  interceptors: {
    requestInterceptor(config: HttpRequestConfig) {
      console.log('当前请求实例的请求拦截器--成功');
      return config;
    },
    requestInterceptorCatch(err) {
      console.log('当前请求实例的请求拦截器--失败');
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      console.log('当前响应实例的请求拦截器--成功');
      return res;
    },
    responseInterceptorCatch(err) {
      console.log('当前响应实例的请求拦截器--失败');
      return err;
    }
  }
});

export default httpRequest;
