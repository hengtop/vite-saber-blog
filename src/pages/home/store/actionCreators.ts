/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-18 02:24:22
 */

import * as actionTypes from './constant';
import { getAllArticle, getArticleByQueryType } from '@/network/api/article';
import type { queryArticle } from '@/network/config/types';
import type { ActionType } from '@/store/types';
import type { QueryType } from '@/components/Label/components/LabelItem';

export const changeArticleAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE,
  value: res
});
export const changeQueryInfoAction = (res: any): ActionType => ({
  type: actionTypes.CHANGE_QUERY,
  value: res
});

export const changeArticleTotalCountAction = (res: number): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE_COUNT,
  value: res
});

export const getAllArticleAction = (query?: queryArticle) => {
  return async (dispatch: any) => {
    const {
      data: { list, totalCount }
    } = await getAllArticle(query);
    dispatch(changeArticleAction(list));
    dispatch(changeArticleTotalCountAction(totalCount));
  };
};

//根据标签或者分类等参数获取文章
export const getArticleByQueryAction = (
  id: number | string,
  queryType: QueryType,
  query?: queryArticle
) => {
  return async (dispatch: any) => {
    const {
      data: { list, totalCount }
    } = await getArticleByQueryType(id, queryType, query);
    dispatch(changeArticleAction(list));
    dispatch(changeArticleTotalCountAction(totalCount));
  };
};
