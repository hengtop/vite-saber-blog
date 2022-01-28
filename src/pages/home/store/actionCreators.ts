/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 16:02:27
 */

import * as actionTypes from './constant';
import { getAllArticle } from '@/network/api/article';
import type { queryArticle } from '@/network/config/types';
import type { ActionType } from '@/store/types';

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
