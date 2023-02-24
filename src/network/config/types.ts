import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CommentType, RepliesType } from '../types';

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

export interface registerQueryType {
  name: string;
  realname?: string;
  email?: string;
  cellphone?: string;
  birthday?: string;
  password: string;
}

export interface SendCommnetReqType {
  article_id: number;
  content: string;
  comment_id?: number;
  root_comment_id?: number;
  reply_user_id?: number;
}

export interface CommentResponseType {
  code: number;
  data: {
    list: CommentType[];
    totalCount: number;
  };
}

export interface CommentReplyResponseType {
  code: number;
  data: {
    list: RepliesType[] | null;
    totalCount: number | null;
  };
}
