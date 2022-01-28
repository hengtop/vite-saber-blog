/*
 * @Date: 2022-01-28 15:53:25
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 21:31:50
 */

import httpRequest from '..';
import type { CommonResponseType, loginType } from '../config/types';

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
