/*
 * @Date: 2022-01-30 23:55:52
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-31 00:11:25
 */
import httpRequest from '..';
import type { CommonResponseType, LabelQueryType } from '../config/types';

export const getLabel = (query?: LabelQueryType) => {
  console.log(query);
  return httpRequest.get<CommonResponseType>({
    url: '/label',
    params: query
  });
};
