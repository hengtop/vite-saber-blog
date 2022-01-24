/*
 * @Date: 2022-01-24 16:09:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 16:17:14
 */
import httpRequest from '..';
import type { CommonResponseType, queryArticle } from '../config/types';

//获取所有的文章
export const getAllArticle = (query?: queryArticle) => {
  return httpRequest.get<CommonResponseType>({
    url: '/article',
    params: query
  });
};
