/*
 * @Date: 2022-01-28 15:53:25
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-31 23:44:32
 */

import httpRequest from '..';
import type { CommonResponseType, loginType, registerQueryType } from '../config/types';

export const login = (query: loginType) => {
  return httpRequest.post<CommonResponseType>({
    url: '/login',
    data: query
  });
};

//获取用户信息
export const getUserInfo = (id: number) => {
  return httpRequest.get<any>({
    url: '/user/' + id
  });
};

//注册
export const register = (query: registerQueryType) => {
  return httpRequest.post<registerQueryType>({
    url: '/user/register',
    data: query
  });
};
