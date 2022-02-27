/*
 * @Date: 2022-01-30 23:55:52
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-27 20:33:01
 */
import httpRequest from '..';
import type { CommonResponseType, LabelQueryType } from '../config/types';

export const getLabel = (query?: LabelQueryType) => {
  return httpRequest.get<CommonResponseType>({
    url: '/label',
    params: query
  });
};
