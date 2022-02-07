/*
 * @Date: 2022-01-24 15:04:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-07 23:38:49
 */

import HttpRequest from './config';
import { toast } from 'react-toastify';
import type { HttpRequestConfig } from './config/types';

export const httpRequest: HttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 5000,
  interceptors: {
    requestInterceptor(config: HttpRequestConfig) {
      console.log('当前请求实例的请求拦截器--成功');
      return config;
    },
    requestInterceptorCatch(err) {
      console.log('当前请求实例的请求拦截器--失败');
      toast.error('网络错误', {
        hideProgressBar: true,
        autoClose: 1500,
        position: 'top-center'
      });
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      console.log('当前响应实例的请求拦截器--成功');
      return res;
    },
    responseInterceptorCatch(err) {
      switch (err.code) {
        case 'ECONNABORTED':
          return toast.error('网络连接失败', {
            hideProgressBar: true,
            autoClose: 1500,
            position: 'top-center'
          });
        default:
          toast.error(err?.response?.data ?? '请求错误', {
            hideProgressBar: true,
            autoClose: 1500,
            position: 'top-center'
          });
      }

      return Promise.reject(err);
    }
  }
});

export default httpRequest;
