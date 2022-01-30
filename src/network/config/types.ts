import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface HttpRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HttpInterceptor<T>;
  showLodding?: boolean;
  showTableLoadding?: boolean;
  isCancelToken?: boolean;
  cancleRequests?: any[];
}

export interface CommonResponseType {
  code: number;
  message?: string;
  data?: any;
}

export interface queryArticle {
  offset?: number;
  limit?: number;
  userId?: number;
  keyword?: string;
}

export interface loginType {
  name: string;
  password: string;
}

export interface LabelQueryType {
  keyword?: string;
  offset?: number;
  limit?: number;
}
