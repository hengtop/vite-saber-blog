/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-20 18:19:43
 */

import * as actionTypes from './constant';
import { getArticleById } from '@/network/api/article';
import type { ActionType } from '@/store/types';

export const changeArticleInfoAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLEINFO,
  value: res
});
export const changeArticleDetailLoadingAction = (res: boolean): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE_DETAIL_LOADING,
  value: res
});

export const getArticleInfoByIdAction = (id: number | string) => {
  return async (dispatch: any) => {
    dispatch(changeArticleDetailLoadingAction(true));
    const { data } = await getArticleById(id);
    await dispatch(changeArticleInfoAction(data));
    dispatch(changeArticleDetailLoadingAction(false));
  };
};
