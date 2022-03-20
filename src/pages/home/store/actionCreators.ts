/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 15:32:20
 */

import * as actionTypes from './constant';
import { getAllArticle, getArticleByQueryType } from '@/network/api/article';
import type { queryArticle } from '@/network/config/types';
import type { ActionType } from '@/store/types';
import type { QueryType } from '@/components/Label/components/LabelItem';
import { awaitHandle } from '@/utils/awaitHandle';

export const changeArticleAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE,
  value: res,
});
export const changeQueryInfoAction = (res: any): ActionType => ({
  type: actionTypes.CHANGE_QUERY,
  value: res,
});

export const changeArticleTotalCountAction = (res: number): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE_COUNT,
  value: res,
});

export const changeArticleLoadingAction = (res: boolean): ActionType => ({
  type: actionTypes.CHANGE_ARTICLELOADING,
  value: res,
});

//获取所有的文章
export const getAllArticleAction = (query?: queryArticle) => {
  return async (dispatch: any) => {
    //设置为加载中
    dispatch(changeArticleLoadingAction(true));
    const [data] = await awaitHandle(getAllArticle(query));
    if (data) {
      const {
        data: { list, totalCount },
      } = data;
      dispatch(changeArticleAction(list));
      dispatch(changeArticleTotalCountAction(totalCount));
    }

    dispatch(changeArticleLoadingAction(false));
  };
};

//根据标签或者分类等参数获取文章
export const getArticleByQueryAction = (
  id: number | string,
  queryType: QueryType,
  query?: queryArticle,
) => {
  return async (dispatch: any) => {
    //设置为加载中
    dispatch(changeArticleLoadingAction(true));
    const [data, err] = await awaitHandle(getArticleByQueryType(id, queryType, query));
    console.log(1111);
    if (data) {
      const {
        data: { list, totalCount },
      } = data;
      dispatch(changeArticleAction(list));
      dispatch(changeArticleTotalCountAction(totalCount));
    }
    console.log(1111);
    //加载完成
    dispatch(changeArticleLoadingAction(false));
  };
};
