/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-20 17:53:23
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

export const changeArticleLoadingAction = (res: boolean): ActionType => ({
  type: actionTypes.CHANGE_ARTICLELOADING,
  value: res
});

//获取所有的文章
export const getAllArticleAction = (query?: queryArticle) => {
  return async (dispatch: any) => {
    //设置为加载中
    dispatch(changeArticleLoadingAction(true));
    const {
      data: { list, totalCount }
    } = await getAllArticle(query);
    await dispatch(changeArticleAction(list));
    await dispatch(changeArticleTotalCountAction(totalCount));
    dispatch(changeArticleLoadingAction(false));
  };
};

//根据标签或者分类等参数获取文章
export const getArticleByQueryAction = (
  id: number | string,
  queryType: QueryType,
  query?: queryArticle
) => {
  return async (dispatch: any) => {
    //设置为加载中
    dispatch(changeArticleLoadingAction(true));
    const {
      data: { list, totalCount }
    } = await getArticleByQueryType(id, queryType, query);
    await dispatch(changeArticleAction(list));
    await dispatch(changeArticleTotalCountAction(totalCount));
    //设置为加载中
    dispatch(changeArticleLoadingAction(false));
  };
};
