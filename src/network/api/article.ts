/*
 * @Date: 2022-01-24 16:09:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 15:31:45
 */
import httpRequest from '..';
import type { CommonResponseType, queryArticle } from '../config/types';
import type { QueryType } from '@/components/Label/components/LabelItem';

//获取所有的文章
export const getAllArticle = (query?: queryArticle) => {
  return httpRequest.get<CommonResponseType>({
    url: '/article',
    params: query,
  });
};

//获取单个文章信息
export const getArticleById = (id: number | string) => {
  return httpRequest.get<CommonResponseType>({
    url: '/article/' + id,
  });
};

//根据标签或者分类批量获取文章
export const getArticleByQueryType = (
  id: number | string,
  queryType: QueryType,
  query?: queryArticle,
) => {
  return httpRequest.get<CommonResponseType>({
    url: '/article/' + queryType + '/' + id,
    params: query,
  });
};
