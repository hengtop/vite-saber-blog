/*
 * @Date: 2022-01-24 15:03:46
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 17:32:19
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HttpInterceptor, HttpRequestConfig } from './types';

const DEFAULT_LOADING = false;
const DEFAULT_CANCLE = false;
const CancelToken = axios.CancelToken;
export default class HttpRequest {
  instance: AxiosInstance;
  interceptors?: HttpInterceptor;
  showLoading?: boolean;
  isCancelToken?: boolean;
  cancleRequests?: any[];

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLodding ?? DEFAULT_LOADING;
    this.isCancelToken = config.isCancelToken ?? DEFAULT_CANCLE;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    //配置所有实例的都有的拦截器
    this.instance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        // 将每个需要取消请求放入取消请求数组中便于取消操请求操作
        if (config.isCancelToken) {
          config.cancelToken = new CancelToken((c) => {
            this.cancleRequests?.push({
              name: `${config.url}&${config.method}`,
              cancel: c
            });
          });
        }
        console.log('每个实例都有的请求拦截器---正确');
        return config;
      },
      (err) => {
        console.log('每个实例都有的请求拦截器---错误');
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log('每个实例都有的响应请求拦截器--正确');
        return res.data;
      },
      (err) => {
        console.log('每个实例都有的响应拦截器--错误');
        return Promise.reject(err);
      }
    );
  }
  request<T>(config: HttpRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //判断该请求是否配置了拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      config.showLodding && (this.showLoading = config.showLodding);
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          //恢复原状态
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          console.log('错误');
          reject(err);
        });
    });
  }
  get<T>(config: HttpRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: HttpRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' });
  }

  put<T>(config: HttpRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  patch<T>(config: HttpRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  delete<T>(config: HttpRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}
