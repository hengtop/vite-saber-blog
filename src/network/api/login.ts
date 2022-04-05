/*
 * @Date: 2022-01-28 15:53:25
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-05 21:21:21
 */

import httpRequest, { refreshHttpRequest } from '../index';

import type { CommonResponseType, loginType, registerQueryType } from '../config/types';

export const login = (query: loginType) => {
  return httpRequest.post<CommonResponseType>({
    url: '/login',
    data: query,
  });
};

//刷新token
export const getTokenByRefreshToken = (refreshToken: string) => {
  return refreshHttpRequest.put<CommonResponseType>({
    url: '/refresh/token',
    headers: {
      Authorization: refreshToken,
    },
  });
};
//测试token是否失效
export const testToken = () => {
  return httpRequest.get<CommonResponseType>({
    url: '/vertify/token',
  });
};

//获取用户信息
export const getUserInfo = (id: number) => {
  return httpRequest.get<any>({
    url: '/user/' + id,
  });
};

//注册
export const register = (query: registerQueryType) => {
  return httpRequest.post<CommonResponseType>({
    url: '/user/register',
    data: query,
  });
};

//给用户分配角色
export const userAddRole = (userId: number, roles: number[]) => {
  return httpRequest.post<CommonResponseType>({
    url: '/user/' + userId + '/roles',
    data: { roles },
  });
};
