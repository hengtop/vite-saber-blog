/*
 * @Date: 2022-01-24 15:04:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-09 23:05:37
 */

import HttpRequest from './config';
import { toast } from 'react-toastify';
import { awaitHandle } from '@/utils/awaitHandle';
import store, { changeTokenAction, loadLocalStore } from '@/store';
import { getTokenByRefreshToken } from './api/login';
import localStore from '@/utils/localStore';
import { handleClickHiddenEvent } from '@/utils/events';
import type { HttpRequestConfig } from './config/types';
import type { AppState } from '@/store/reducer';

export const refreshHttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 10000
});

export const httpRequest: HttpRequest = new HttpRequest({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 10000,
  interceptors: {
    requestInterceptor(config: HttpRequestConfig) {
      console.log('当前请求实例的请求拦截器--成功');
      // 获取token添加到请求头
      const state = store.getState();
      const token = (state as any as AppState).getIn(['main', 'token']);
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
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
    async responseInterceptorCatch(err) {
      //刷新token
      const responseCode = err?.response?.status;
      // 如果是401错误就尝试刷新token
      if (responseCode === 401) {
        // 通过refreshToken去刷新token
        const state = store.getState();
        const refreshToken = (state as any as AppState).getIn(['main', 'refreshToken']);
        const [data, loginErr] = await awaitHandle(getTokenByRefreshToken(refreshToken as string));
        if (!loginErr) {
          // 更新token
          const loginData = data?.data;
          console.log('更新token');
          store.dispatch(changeTokenAction(loginData.token));
          localStore.setLocalStore('token', loginData.token);
          // 重新发送上次发送失败的请求
          // todo 记录一个问题这里为什么获取不到最新的token，目前讨论dispath后获取不到最新的state，这里烦的错误就是一直使用的最先的state，如果要获取新的需要重新调用store.getState()生成最新的state！！！
          //console.log(res, (state as any as AppState).getIn(['main', 'token']));//永远都是旧的，因为引用没变
          //console.log(res, (store.getState() as any as AppState).getIn(['main', 'token'])); --- 这里才可以获取到最新的！！！
          const res = await httpRequest.request(err.config);

          return { data: res };
        } else {
          //清空缓存
          localStore.clearLocalStore();
          store.dispatch(loadLocalStore() as any);
          handleClickHiddenEvent.emit('openLoginWindow');
        }
      }
      switch (err?.response?.status) {
        case 'ECONNABORTED':
          return toast.error('网络连接失败', {
            hideProgressBar: true,
            autoClose: 1500,
            position: 'top-center'
          });
        case 401:
          break;
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
